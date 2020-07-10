import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Product } from "../../../entity/Store";
import { UserRole, User } from "../../../entity/User";
import { MyContext } from "../../../ts/context";
import { ProductInput } from "../storeInput";

@Resolver()
export class CreateProductResolver {
  @Mutation(type => Product)
  @Authorized([UserRole['ADMIN']])
  createProduct(@Arg('data') data: ProductInput) {
    return new Promise(async (resolve, reject) => {
      const { name, cost, description, UPCCode, inventory } = data;

      if (cost < 0) {
        reject(new Error('Cost must be equal to or greater than zero'))
        return
      }

      // create service
      Product.create({
        name,
        cost,
        description,
        UPCCode,
        inventory
      }).save()
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }
}