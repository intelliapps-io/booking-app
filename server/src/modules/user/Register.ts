import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";

import { RegisterInput } from "./register/RegisterInput";
import { sendConfirmationEmail } from "../../helpers/sendEmail";
import { Organization } from "../../entity/Organization";

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') {
    firstName,
    lastName,
    email,
    password,
    organizationUrl,
    organizationId
  }: RegisterInput): Promise<User> {
    return new Promise(async (resolve: (data?: any) => void, reject: (err: Error) => void) => {
      const hashedPassword = await bcrypt.hash(password, 12);

      // check for either organizationUrl or organizationId
      if (!organizationUrl && !organizationId)
        return reject(new Error('Must provide either organization url or organization id'))

      // find organization
      let organization: Organization | undefined | void
      if (organizationUrl)
        organization = await Organization.findOne({ where: { urlName: organizationUrl }}).catch(err => reject(err))
      else if (organizationId)
        organization = await Organization.findOne({ where: { id: organizationId }}).catch(err => reject(err))
      if (!organization)
        return reject(new Error(`Organization not found by ${organizationUrl ? 'organizationUrl' : 'organizationId' }`))
      
      // check to make sure email does not exist in organization
      const existingUser = await User.findOne({ where: { email, organization } }).catch(err => reject(err))
      if (existingUser)
        return reject(new Error(`This email is already in use for the organization ${organization.name}`))

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        organization
      }).save();
  
      sendConfirmationEmail(user);
  
      resolve(user)
    })
  }
}