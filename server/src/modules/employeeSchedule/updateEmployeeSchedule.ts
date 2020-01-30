import { Resolver, Authorized, Mutation, Arg, Ctx } from "type-graphql"
import { EmployeeSchedule } from "../../entity/EmployeeSchedule"
import { UserRole, User } from "../../entity/User"
import { EmployeeScheduleInput, validateEmployeeSchedule } from "./EmployeeScheduleInput"
import { MyContext } from "../../ts/context"

@Resolver()
export class UpdateEmployeeSchedule {
  @Mutation(type => EmployeeSchedule)
  @Authorized([UserRole['EMPLOYEE']])
  updateEmployeeSchedule(@Arg('id') id: string, @Arg('data') data: EmployeeScheduleInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      // find user
      const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user)
        return reject(new Error('Please login'))

      // find schedule by id
      const employeeSchedule = await EmployeeSchedule.findOne({ where: { id } }).catch(err => reject(err))
      if (!employeeSchedule)
        return reject(new Error('Employee schedule could not be found by id'))
      if (user.role === UserRole['EMPLOYEE'] && employeeSchedule.employee.id !== user.id)
        return reject(new Error('Permission denied, you do not own that employee schedule found by id'))

      // find the employee record for the new schedule
      let employee: User | undefined | void
      if (user.role === UserRole['ADMIN']) {
        // find employee by employeeId
        if (!data.employeeId)
          return reject(new Error('Please provide the id of the employee'))
        employee = await User.findOne({ where: { id: data.employeeId, role: UserRole['EMPLOYEE'] } })
          .catch(err => reject(err))
      } else if (user.role === UserRole['EMPLOYEE']) {
        // find employee by user context
        employee = user
      }

      // validate employee record
      if (!employee)
        return reject(new Error('Employee record not found'))
      if (employee.role !== UserRole["EMPLOYEE"])
        return reject(new Error('Employee found does not have employee role'))

      // validate employee schedule data
      const isValid = await validateEmployeeSchedule(data).catch(err => reject(err))
      if (!isValid)
        return reject(new Error('Invalid employee schedule data'))

      // update schedule
      EmployeeSchedule.update(id, { ...data, employee })
        .catch(err => reject(err))
        .then(() => {
          employeeSchedule.reload()
            .catch(err => reject(err))
            .then(() => resolve(employeeSchedule))
        })
    })
  }
}