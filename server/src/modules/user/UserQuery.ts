import { Resolver, Query, Ctx, Authorized, ObjectType, InputType, Field, Arg } from "type-graphql";
import { User, UserRole } from "../../entity/User";

@Resolver()
export class QueryUserResolver {
  @Query(() => User)
  @Authorized([UserRole["ADMIN"]])
  async user(@Arg('id') id: string): Promise<User> {
    return new Promise(async (resolve: (arg: User) => void, reject) => {
      // find the user who ran the query
      const user = await User.findOne({ where: { id } }).catch(err => reject(err))
      if (!user) {
        reject(new Error('No user found with that id'))
        return
      }
      
      resolve(user)
    })
  }
}