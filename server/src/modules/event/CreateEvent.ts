import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Event } from "../../entity/Event";
import { UserRole, User } from "../../entity/User";
import { ManyToOne } from "typeorm";
import { MyContext } from "../../ts/context";
import { rejects } from "assert";
import { EventInput } from "./EventInput";

@Resolver()
export class CreateEventResolver {
  @Mutation(type => Event)
  @Authorized([UserRole['CUSTOMER']])
  createEvent(@Arg('data') data: EventInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      let customer = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      let employee = await User.findOne({ where: { id: data.employeeId, role: UserRole['EMPLOYEE'] } }).catch(err => reject(err))
      if (!customer) {
        reject(new Error('error user not found'))
        return
      }
      if (!employee) {
        reject(new Error('error employee not found'))
        return
      }
      let event = await Event.create({
        customer, 
        employee,
        // service: data.service,
        datetime: data.datetime,
        duration: data.duration
      }).save().catch(err => reject(err))
      if (!event) {           
        reject(new Error('error event not created'))
        return
      }
      resolve(event);
  })
    
  }

}