import { Resolver, Query, Authorized, Ctx } from "type-graphql";
import { UserRole, User } from "../../entity/User";
import { Event } from "../../entity/Event";
import { MyContext } from "../../ts/context";

@Resolver()
export class QueryEventsResolver {
  @Query(type => [Event])
  @Authorized([UserRole['CUSTOMER']])    
  queryEvents(@Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user) {
        reject(new Error('error user not found'))
        return
      }
      let events: Event[] | undefined | void = undefined
      if(user.role === UserRole['ADMIN'])
        events = await Event.find().catch(error => reject(error))
      else if (user.role === UserRole['EMPLOYEE'])
        events = await Event.find({where: {employee: {id: user.id}}}).catch(error => reject(error))// finds all events that match emplyee id   
      else 
        events = await Event.find({where: {customer: {id: user.id}}}).catch(error => reject(error))       
      
        // different if
      if (!events) {
        reject(new Error('events no found'))
        return
      }
      resolve(events)
    })

  }
  
  
}