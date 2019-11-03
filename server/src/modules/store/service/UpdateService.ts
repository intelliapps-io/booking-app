import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Service } from "../../../entity/Store";
import { UserRole, User } from "../../../entity/User";
import { MyContext } from "../../../ts/context";
import { ServiceInput } from "../storeInput";

@Resolver()
export class UpdateServiceResolver {
  @Mutation(type => Service)
  @Authorized([UserRole['ADMIN']])
  updateService(@Arg('id') id: string, @Arg('data') data: ServiceInput) {
    return new Promise(async (resolve, reject) => {
      const { name, cost, duration, description, UPCCode, employeeIds } = data;
      
      // find existing service by id
      const service = await Service.findOne({ where: { id } })
        .catch(err => reject(err))

      if (!service) {
        reject(new Error('Service not found by id'))
        return
      }

      // find employees
      const employees = await User.findByIds(employeeIds, { where: { role: UserRole['EMPLOYEE'] } })
        .catch(err => reject(err))

      if (typeof employees !== 'object') {
        reject(new Error('Employees not found'))
        return
      }

      if (cost < 0) {
        reject(new Error('Cost must be equal to or greater than zero'))
        return
      }

      if (duration < 0) {
        reject(new Error('Duration must be equal to or greater than zero'))
        return
      }

      // update service fields
      service.name = name
      service.cost = cost
      service.duration = duration
      service.description = description
      service.UPCCode = UPCCode
      service.employees = employees

      // save updated data
      service.save()
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }
}