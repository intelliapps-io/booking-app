import { Resolver, Query, Authorized, Ctx, ObjectType, InputType, Arg } from "type-graphql";
import { UserRole, User } from "../../entity/User";
import { Event } from "../../entity/Event";
import { MyContext } from "../../ts/context";
import { PaginatedResponse, PaginatedResponseInput } from "../../helpers/graphqlObjects/PaginatedResponse";

@ObjectType()
class PaginatedEventsResponse extends PaginatedResponse(Event) { }

@InputType()
class QueryEventsInput extends PaginatedResponseInput {

}

@Resolver()
export class QueryEventsResolver {
  @Query(type => PaginatedEventsResponse)
  @Authorized([UserRole['CUSTOMER']])
  queryEvents(@Arg('data') data: QueryEventsInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve: (result: PaginatedEventsResponse) => void, reject) => {
      let user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user) {
        reject(new Error('error user not found'))
        return
      }

      let events: [Event[], number] | undefined | void = undefined
      if (user.role === UserRole['ADMIN'])
        events = await Event.findAndCount({ skip: data.offset, take: data.limit }).catch(error => reject(error))
      else if (user.role === UserRole['EMPLOYEE'])
        events = await Event.findAndCount({ skip: data.offset, take: data.limit, where: { employee: { id: user.id } } }).catch(error => reject(error))// finds all events that match emplyee id   
      else
        events = await Event.findAndCount({ skip: data.offset, take: data.limit, where: { customer: { id: user.id } } }).catch(error => reject(error))

      // different if
      if (!events) {
        reject(new Error('events no found'))
        return
      }

      resolve({ items: events[0], total: events[1] })
    })

  }


}