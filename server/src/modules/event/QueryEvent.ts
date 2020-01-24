import { Resolver, Query, Authorized, Ctx, Arg } from "type-graphql";
import { UserRole, User } from "../../entity/User";
import { Event } from "../../entity/Event";
import { MyContext } from "../../ts/context";

@Resolver()
export class QueryEventResolver {
  @Query(type => Event)
  @Authorized([UserRole['CUSTOMER']])    
  queryEvent( @Arg('id') id: string, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user) {
        reject(new Error('error user not found'))
        return
      }
      let event: Event | undefined | void = undefined
      if(user.role === UserRole['ADMIN'])
        event = await Event.findOne({where: {id}}).catch(error => reject(error))
      else if (user.role === UserRole['EMPLOYEE'])
        event = await Event.findOne({where: {id, employee: {id: user.id}}}).catch(error => reject(error))//finds one with id 
      else 
        event = await Event.findOne({where: {id, customer: {id: user.id}}}).catch(error => reject(error))       
      
        // different if
      if (!event) {
        reject(new Error('event not found'))
        return
      }
      resolve(event)
    })

  }
  
  
}