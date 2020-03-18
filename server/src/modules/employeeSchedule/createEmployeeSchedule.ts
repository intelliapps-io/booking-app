import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Event } from "../../entity/Event";
import { UserRole, User } from "../../entity/User";
import { ManyToOne } from "typeorm";
import { MyContext } from "../../ts/context";
import { EmployeeScheduleInput, validateEmployeeSchedule } from "./EmployeeScheduleInput";
import { EmployeeSchedule } from "../../entity/EmployeeSchedule";

@Resolver()
export class CreateEmployeeSchedule {
  @Mutation(type => EmployeeSchedule)
  @Authorized([UserRole['EMPLOYEE']])
  createEmployeeSchedule(@Arg('data') data: EmployeeScheduleInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      // find user
      const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user)
        return reject(new Error('Please login'))

      // find the employee record for the new schedule
      let employee: User | undefined | void
      if (user.role === UserRole['ADMIN']) {
        // find employee by employeeId
        if (!data.employeeId)
          employee = user
        else
          employee = await User.findOne({ where: { id: data.employeeId } })
            .catch(err => reject(err))
      } else if (user.role === UserRole['EMPLOYEE']) {
        // find employee by user context
        employee = user
      }

      // validate employee record
      if (!employee)
        return reject(new Error('Employee record not found'))

      // validate employee schedule data & save record
      validateEmployeeSchedule(data)
        .catch(err => reject(err))
        .then(() =>
          EmployeeSchedule.create({
            ...data,
            employee: employee as User
          }).save()
            .then(record => resolve(record))
            .catch(err => reject(err))
        )
    })
  }
}