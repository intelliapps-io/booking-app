import { Resolver, Query, Ctx, Authorized, ObjectType, InputType, Field, Arg } from "type-graphql";
import { User, UserRole } from "../../entity/User";
import { MyContext } from "../../ts/context";
import { PaginatedResponse, PaginatedResponseInput } from "../../helpers/graphqlObjects/PaginatedResponse";

@ObjectType()
class PaginatedUsersResponse extends PaginatedResponse(User) {}

@InputType()
class QueryUsersInput extends PaginatedResponseInput {
  @Field({ nullable: true })
  role?: UserRole
}

@Resolver()
export class QueryUsersResolver {
  @Query(() => PaginatedUsersResponse)
  @Authorized([UserRole["CUSTOMER"]])
  async users(@Arg('data') data: QueryUsersInput, @Ctx() ctx: MyContext): Promise<PaginatedUsersResponse> {
    return new Promise(async (resolve: (arg: PaginatedUsersResponse) => void, reject) => {
      // find the user who ran the query
      const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user) {
        reject(new Error('Please login, account not found'))
        return
      }

      // find the users that they requested and check their role to limit access
      let paginatedResponse: PaginatedUsersResponse = { items: [], total: 0 }

      // when the user who queried is an customer
      if (user.role === UserRole["CUSTOMER"]) {
        if (data.role !== UserRole["EMPLOYEE"]) {
          reject(new Error(`Permission denied, you cannot query ${data.role} as a ${user.role}`))
          return
        } else if (data.role === UserRole["EMPLOYEE"]) {
          const result = await User.findAndCount({ where: { role: data.role }, skip: data.offset, take: data.limit }).catch(err => reject(err))
          if (!result) {
            reject(new Error('Could not query users'))
            return
          }
          paginatedResponse = { items: result[0], total: result[1] }
        }
      }

      // when the user who queried is an employee or admin
      else {
        let result: (void | [User[], number])

        if (!data.role) 
          result = await User.findAndCount({ skip: data.offset, take: data.limit }).catch(err => reject(err))
        else           
          result = await User.findAndCount({ where: { role: data.role }, skip: data.offset, take: data.limit }).catch(err => reject(err))
        
        if (!result) {
          reject(new Error('Could not query users'))
          return
        }
        paginatedResponse = { items: result[0], total: result[1] }
      }
      
      resolve(paginatedResponse)
    })
  }
}