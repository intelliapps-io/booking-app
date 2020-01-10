import nodemailer from "nodemailer";
import { User } from "../entity/User";

export interface SendMailOptions {
  to: string
  subject: string
  html: string
}

export const sendEmail = async ({ to, subject, html }: SendMailOptions) => {
  const accountAddress = 'noreply@worksoft.systems'
  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: accountAddress, // generated ethereal user
      pass: 'sfCXs0dTv2wEO1tQi30Y' // generated ethereal password
    }
  })
  return transporter.sendMail({ from: accountAddress, to, subject, html,  })
}

export const sendConfirmationEmail = async (user: User) => {
  // @ts-ignore
  const { NODE_ENV, DEV_DOMAIN, DEV_CLIENT_PORT, PROD_DOMAIN } = process.env as ENV;
  const domain = NODE_ENV === "development" ? `${DEV_DOMAIN}:${DEV_CLIENT_PORT}` : PROD_DOMAIN;
  const to = user.email;
  const subject = "Confirm Your Account for WorkSoft Systems";
  const html = `
  <h2><span style="font-family: 'arial black', sans-serif;">Thank you for joining WorkSoft Systems!</span></h2>
  <p><span style="font-family: verdana, geneva, sans-serif;">In order to secure your account, we must confirm your email. Please click the link below to verify your account.&nbsp;</span></p>
  <a href="${user.organization.urlName}${domain}/account/confirm/${user.id}">
    <h3><span style="font-family: helvetica, arial, sans-serif;">Click here confirm you account</span></h3>
  </a>
  `;
  return sendEmail({ to, subject, html });
}