import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Event } from "../../entity/Event";
import { UserRole, User } from "../../entity/User";
import { ManyToOne } from "typeorm";
import { MyContext } from "../../ts/context";
import { rejects } from "assert";




@InputType()
export class EventInput {
  @Field(type => Date)//define type grapghql
  date: Date

  @Field(type => String)
  time: string

  @Field(type => Int, { description: 'duration in minutes' })
  duration: number

  @Field(type => ID)
  employeeId: string
}


@Resolver()
export class CreateEventResolver {
  @Mutation(type => Event)
  @Authorized([UserRole['USER']])
  createEvent(@Arg('data') data: EventInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      let employee = await User.findOne({ where: { id: data.employeeId, role: UserRole['EMPLOYEE'] } }).catch(err => reject(err))
      if (!user) {
        reject(new Error('error user not found'))
        return
      }
      if (!employee) {
        reject(new Error('error employee not found'))
        return
      }
      let event = await Event.create()
  })
    
  }

}