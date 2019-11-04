import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Service } from "../../../entity/Store";
import { UserRole } from "../../../entity/User";

@Resolver()
export class DeleteServiceResolver {
  @Mutation(type => ID)
  @Authorized([UserRole['ADMIN']])
  deleteService(@Arg('id') id: string) {
    return new Promise(async (resolve, reject) => {
      // find existing service by id
      const service = await Service.findOne({ where: { id } })
        .catch(err => reject(err))

      if (!service) {
        reject(new Error('Service not found by id'))
        return
      }

      service.remove()
        .then(() => resolve(id))
        .catch(err => reject(err))
    })
  }
}