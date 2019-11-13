import { Resolver, Authorized, Mutation, Arg, Ctx, InputType, Field, ID } from "type-graphql"
import { EmployeeSchedule } from "../../entity/EmployeeSchedule"
import { UserRole, User } from "../../entity/User"
import { EmployeeScheduleInput, validateEmployeeSchedule } from "./EmployeeScheduleInput"
import { MyContext } from "../../ts/context"
import { FindOperator, MoreThan, LessThan, LessThanOrEqual, MoreThanOrEqual, ObjectType } from "typeorm"

@InputType()
class QueryEmployeeSchedulesInput {
  @Field(type => Date, { nullable: true })
  before?: Date 

  @Field(type => Date, { nullable: true })
  after?: Date 

  @Field(type => ID, { nullable: true })
  employeeId?: string
}

@Resolver()
export class QueryEmployeeSchedules {
  @Mutation(type => [EmployeeSchedule])
  @Authorized([UserRole['EMPLOYEE']])
  employeeSchedules(@Arg('data', { nullable: true}) data: QueryEmployeeSchedulesInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      // defualt data
      if (!data) data = {}
      
      // find user
      const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user)
        return reject(new Error('Please login'))
      

      // find schedule 
      const employeeSchedules = await EmployeeSchedule.find({
        where: {
          employee: user.role === UserRole['EMPLOYEE'] ? { id: user.id } : data && data.employeeId ? { id: data.employeeId } : null,
        }
      }).catch(err => reject(err))
      if (!employeeSchedules)
        return reject(new Error('Employee schedule could not be found by id'))
      
      // return employee schedule 
      resolve(employeeSchedules)
    })
  }
}