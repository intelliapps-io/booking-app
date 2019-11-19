import { Resolver, Mutation, Arg, Authorized, Ctx, InputType, Field } from "type-graphql";
import bcrypt from "bcryptjs";
import { User, UserRole } from "../../entity/User";
import { MyContext } from "../../ts/context";

@InputType()
class UpdateUserInput {
  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  role?: UserRole
}

@Resolver()
export class UpdateUserResolver {
  @Mutation(() => User)
  @Authorized([UserRole['CUSTOMER']])
  async updateUser(@Arg('data') {
    firstName,
    lastName,
    email,
    password,
    role,
    userId
  }: UpdateUserInput, @Ctx() ctx: MyContext): Promise<User> {
    return new Promise(async (resolve: (data?: any) => void, reject: (err: Error) => void) => {
      const user = await User.findOne({ where: { id: ctx.req.userId }}).catch(err => reject(err))
      if (!user)
        return reject(new Error('Please login'))
      if (!user.organization)
        return reject(new Error('You must belong to an organization in order to update your account'))
      
      if (user.role === UserRole['CUSTOMER'] || (user.role === UserRole['ADMIN'] && !userId)) {
        if (role) 
          return reject(new Error('Permission denied, you cannot change your own role'))

        // update name
        if (firstName) user.firstName = firstName
        if (lastName) user.lastName = lastName

        // update email
        if (email && email !== user.email) {
          const existingUser = await User.findOne({ where: { email, organization: user.organization } }).catch(err => reject(err))
          if (existingUser)
            return reject(new Error('Email already in use and cannot be updated'))
          user.email = email
        }

        // update password
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 12);
          user.password = hashedPassword
          user.authCount += 1
        }

        // save user information
        await user.save().catch(err => reject(err))
        return resolve(user)
      } 
      
      if (user.role === UserRole['ADMIN'] && userId) {
        const targetUser = await User.findOne({ where: { id: userId, organization: user.organization } }).catch(err => reject(err))
        if (!targetUser)
          return reject(new Error('User to be updated was not found with userId or does not belong to your oragnization'))
        if (targetUser.role === UserRole['CUSTOMER'])
          return reject(new Error('You cannot update customer accounts'))
        
        // update name
        if (firstName) targetUser.firstName = firstName
        if (lastName) targetUser.lastName = lastName

        // update email
        if (email && email !== targetUser.email) {
          const existingUser = await User.findOne({ where: { email, organization: targetUser.organization } }).catch(err => reject(err))
          if (existingUser)
            return reject(new Error('Email already in use and cannot be updated'))
            targetUser.email = email
        }

        // update password
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 12);
          targetUser.password = hashedPassword
          targetUser.authCount += 1
        }

        // update role
        if (role && role === UserRole['CUSTOMER'])
          return reject(new Error(`You cannot update a user's role to customer`))
        if (role) 
          targetUser.role = role
        
        // save user information
        await user.save().catch(err => reject(err))
        return resolve(user)
      }
    })
  }
}