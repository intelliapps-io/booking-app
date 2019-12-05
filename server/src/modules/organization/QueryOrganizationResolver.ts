import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx, Query } from "type-graphql";
import { Organization, validateHoursOfOperation } from "../../entity/Organization";
import { UserRole, User } from "../../entity/User";
import { OrganizationInput } from "./OrganizationInput";
import { MyContext } from "../../ts/context";

@InputType()
class QueryOrganizationInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  urlName?: string
}

@Resolver()
export class QueryOrganizationResolver {
  @Query(type => Organization)
  organization(@Arg('data') data: QueryOrganizationInput) {
    return new Promise(async (resolve, reject) => {
      let organization: Organization | void | undefined = undefined
      
      // find organization
      if (data.id)
        organization = await Organization.findOne({ where: { id: data.id } })
      else if (data.urlName)
        organization = await Organization.findOne({ where: { urlName: data.urlName.trim().toLowerCase() }})
      else
        return reject('You must provide either organization id or organization urlName')
      
      // check if found
      if (!organization)
        return reject(`Organization not found with ${data.id ? 'id' : 'urlName'}`)
      else
        resolve(organization)
    })
  }
}