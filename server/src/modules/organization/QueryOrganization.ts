import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Organization, validateHoursOfOperation } from "../../entity/Organization";
import { UserRole, User } from "../../entity/User";
import { OrganizationInput } from "./OrganizationInput";
import { MyContext } from "../../ts/context";

@Resolver()
export class UpdateOrganizationResolver {
  @Mutation(type => Organization)
  @Authorized([UserRole['ADMIN']])
  queryOrganization(@Arg('id') organizationId: string, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      
    })
  }
}