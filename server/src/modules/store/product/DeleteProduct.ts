import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Product } from "../../../entity/Store";
import { UserRole } from "../../../entity/User";

@Resolver()
export class DeleteProductResolver {
  @Mutation(type => ID)
  @Authorized([UserRole['ADMIN']])
  deleteProduct(@Arg('id') id: string) {
    return new Promise(async (resolve, reject) => {
      // find existing service by id
      const service = await Product.findOne({ where: { id } })
        .catch(err => reject(err))

      if (!service) {
        reject(new Error('Product not found by id'))
        return
      }

      service.remove()
        .then(() => resolve(id))
        .catch(err => reject(err))
    })
  }
}