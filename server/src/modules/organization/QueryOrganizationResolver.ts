import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx, Query } from "type-graphql";
import { Organization, validateHoursOfOperation } from "../../entity/Organization";
import { UserRole, User } from "../../entity/User";
import { OrganizationInput } from "./OrganizationInput";
import { MyContext } from "../../ts/context";

@Resolver()
export class QueryOrganizationResolver {
  @Query(type => Organization)
<<<<<<< HEAD
  @Authorized([UserRole['ADMIN']])
=======
>>>>>>> 040d19c73cf322da47c586187049e57b62214202
  organization(@Arg('id') organizationId: string, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      Organization.findOne({ where: { id: organizationId } })
        .catch((error) => reject(error))
        .then(record => {
          if (record)
            resolve(record)
          else
            reject(new Error("no matching organization"))
      })
    })
  }
}