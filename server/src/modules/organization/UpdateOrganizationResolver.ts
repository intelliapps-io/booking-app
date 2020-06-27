import { Resolver, Mutation, Authorized, InputType, Field, Int, ID, Arg, Ctx } from "type-graphql";
import { Organization, validateHoursOfOperation } from "../../entity/Organization";
import { UserRole, User } from "../../entity/User";
import { OrganizationInput } from "./OrganizationInput";
import { MyContext } from "../../ts/context";
import { nodeLogger } from "../../helpers/helpers";

@Resolver()
export class UpdateOrganizationResolver {
  @Mutation(type => Organization)
  @Authorized([UserRole['ADMIN']])
  updateOrganization(@Arg('id') organizationId: string, @Arg('data') data: OrganizationInput, @Ctx() ctx: MyContext) {
    return new Promise(async (resolve, reject) => {
      // find user
      const user = await User.findOne({ where: { id: ctx.req.userId } }).catch(err => reject(err))
      if (!user)
        return reject(new Error('Please login, no user found with your id'))
      
      // find organization
      const organization = await Organization.findOne({ where: { id: organizationId } }).catch(err => reject(err))
      if (!organization)
        return reject(new Error('No organization found with that id'))

      // verify user is admin
      if (user.role !== UserRole['ADMIN'])
        return reject(new Error('Permission denied, you are not an admin'))

      // verify user belongs to organization
      if (!user.organization || user.organization.id !== organizationId) 
        return reject(new Error('Permission denied, you do not belong to the organization with that id'))
      
      // validate hours of operation
      if (!validateHoursOfOperation(data.hoursOfOperation))
        return reject(new Error('hours of operation is invalid'))
      
      // validate unique orangizaton urlName
      if (organization.urlName !== data.urlName) {
        const existingOrganization = await Organization.findOne({ where: { urlName: data.urlName.trim().toLowerCase() } })
        if (existingOrganization)
          return reject(new Error(`${data.urlName} is already in use by another organization`))
      }
      nodeLogger(data.hoursOfOperation)
      
      // validate urlName length
      if (data.urlName.trim().toLowerCase().length < 4)
        return reject(new Error(`organization url name must be at leat 4 characters`))
      
      // update organization record
      organization.urlName = data.urlName.trim().toLowerCase()
      organization.name = data.name
      organization.phone = data.phone
      organization.address = data.address
      organization.contactEmail = data.contactEmail
      organization.hoursOfOperation = data.hoursOfOperation
      organization.landingHtml = data.landingHtml

      // save updated data
      organization.save()
        .catch(err => reject(err))
        .then(() => resolve(organization))
    })
  }
}