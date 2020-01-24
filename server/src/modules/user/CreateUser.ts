import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import { User, UserRole } from "../../entity/User";
import bcrypt from "bcryptjs";

import { RegisterInput } from "./register/RegisterInput";
import { MyContext } from "../../ts/context";

@Resolver()
export class CreateUserResolver {
  @Mutation(() => User)
  @Authorized([UserRole['ADMIN']])
  async createUser(@Arg('data') {
    firstName,
    lastName,
    email,
    password,
    role
  }: RegisterInput, @Ctx() ctx: MyContext): Promise<User> {
    return new Promise(async (resolve: (data?: any) => void, reject: (err: Error) => void) => {
      // find user
      const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user)
        return reject(new Error('Please login, no account found'))
      
      // ensure user belongs to an organization
      if (!user.organization)
        return reject(new Error('You must belong to an organization in order to create a new user'))
      
      // check to make sure email does not exist in organization
      const existingUser = await User.findOne({ where: { email, organization: user.organization } }).catch(err => reject(err))
      if (existingUser)
        return reject(new Error(`This email is already in use for the organization ${user.organization.name}`))
      
      // make sure the role is not customer
      if (!(role === UserRole['ADMIN'] || role === UserRole['EMPLOYEE']))
        return reject(new Error('New user role must be either Admin or Employee'))

      const hashedPassword = await bcrypt.hash(password, 12);
      
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        emailConfirmed: true,
        organization: user.organization
      }).save();
  
      resolve(newUser)
    })
  }
}