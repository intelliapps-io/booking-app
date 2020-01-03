import { Resolver, Query, Ctx, Authorized, ObjectType, InputType, Field, Arg, Mutation } from "type-graphql";
import { User, UserRole } from "../../entity/User";
import { MyContext } from "../../ts/context";
import { rejects } from "assert";

@Resolver()
export class DeleteUserResolver {
  @Mutation(() => User)
  @Authorized([UserRole['CUSTOMER']])
  async deleteUser(@Arg('id') id: string, @Ctx()context: MyContext): Promise<User> {
    return new Promise(async (resolve: (arg: User) => void, reject) => {
      // find the user who ran the query
      const user = await User.findOne({ where: { id: context.req.userId } }).catch(err => reject(err))
      if (!user) {
        reject(new Error('No user found'))
        return
      }
      //fid target user

      const targetUser = await User.findOne({ where: { id } }).catch(err => reject(err))
      if (!targetUser) {
        reject(new Error('No user found with that id'))
        return
      }
      if (context.req.role === UserRole['CUSTOMER'] && user.id === targetUser.id) {
        targetUser.remove()
          .then(() => resolve(targetUser))
          .catch(error => reject(error))
      }
      else if (
        context.req.role === UserRole['ADMIN'] &&
        user.id !== targetUser.id &&
        user.organization.id === targetUser.organization.id &&
        (targetUser.role === UserRole['ADMIN'] || targetUser.role === UserRole['EMPLOYEE'])
      ) {
        targetUser.remove()
          .then(() => resolve(targetUser))
          .catch(error => reject(error))
      }
      else {
        reject(new Error('Employee can not delete account'))
      }
    })
  }
}