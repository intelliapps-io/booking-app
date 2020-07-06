import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Product } from "../../../entity/Store";
import { UserRole, User } from "../../../entity/User";
import { MyContext } from "../../../ts/context";
import { ProductInput } from "../storeInput";

@Resolver()
export class UpdateProductResolver {
  @Mutation(type => Product)
  @Authorized([UserRole['ADMIN']])
  updateProduct(@Arg('id') id: string, @Arg('data') data: ProductInput) {
    return new Promise(async (resolve, reject) => {
      const { name, cost, description, UPCCode, inventory } = data;
      
      // find existing service by id
      const service = await Product.findOne({ where: { id } })
        .catch(err => reject(err))

      if (!service) {
        reject(new Error('Product not found by id'))
        return
      }


      if (cost < 0) {
        reject(new Error('Cost must be equal to or greater than zero'))
        return
      }


      // update service fields
      service.name = name
      service.cost = cost
      service.description = description
      service.UPCCode = UPCCode
      service.inventory = inventory

      // save updated data
      service.save()
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }
}