import { Resolver, Authorized, Mutation, Arg, Ctx } from "type-graphql"
import { EmployeeSchedule } from "../../entity/EmployeeSchedule"
import { UserRole, User } from "../../entity/User"
import { EmployeeScheduleInput, validateEmployeeSchedule } from "./EmployeeScheduleInput"
import { MyContext } from "../../ts/context"

@Resolver()
export class DeleteEmployeeSchedule {
  @Mutation(type => String)
  @Authorized([UserRole['EMPLOYEE']])
  deleteEmployeeSchedule(@Arg('id') id: string, @Ctx() ctx: MyContext) {
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

      employeeSchedule.remove()
        .catch(err => reject('Employee schedule could not be deleted'))
        .then(() => resolve(id))
    })
  }
}