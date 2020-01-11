import expressAsyncHandler = require("express-async-handler");
import { MyContext } from "../../ts/context";
import { nodeLogger } from "../helpers";
import { User } from "../../entity/User";
import { Organization } from "../../entity/Organization";

export const confirmEmailRoute = expressAsyncHandler(async (req: MyContext['req'], res, next): Promise<any> => {
  // verify url params
  if (!req.headers.host)
    return res.send('Error: Host is undefined')
  if (!req.params.userId)
    return res.send('Error: User ID is undefined')

  const userId = req.params.userId as string
  const organizationUrl = req.headers.host.split('.')[0]

  nodeLogger(userId)

  // get user record
  const user = await User.findOne({ where: { id: userId } }).catch(() => {})

  if (!user)
    return res.send('Error: This link is invalid.')

  // get organization record
  const organization = await Organization.findOne({ where: { urlName: organizationUrl } }).catch(() => {})

  if (!organization)
    return res.send(`Error: This link is invalid, ${organizationUrl} does not belong to any organization.`)
  
  // check if user belongs to organization url
  if (user.organization.id !== organization.id)
    return res.send(`Error: This link is invalid, this account does not belong to ${organization.name}.`)
  
  // set user to email confirmed: true
  user.emailConfirmed = true

  // save user and redirect
  user.save()
    .then(() => res.redirect(`http://${organizationUrl}.worksoft.systems/#/login/EMAIL_CONFIRMED`))
    .catch(err => res.send('There was an error procesing your account email confirmation.'))
})