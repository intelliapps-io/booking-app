import nodemailer from "nodemailer";
import { User } from "../entity/User";

export interface SendMailOptions {
  to: string
  subject: string
  html: string
}

export const sendEmail = async ({ to, subject, html }: SendMailOptions) => {
  const accountAddress = "test@dommentee.com"
  const transporter = nodemailer.createTransport({
    host: 'mail.dommentee.com',
    port: 465,
    secure: true, 
    auth: {
      user: 'test@dommentee.com', // generated ethereal user
      pass: 'milkNhon3y!' // generated ethereal password
    }
  })
  return transporter.sendMail({ from: accountAddress, to, subject, html })
}

export const sendConfirmationEmail = async (user: User) => {
  // @ts-ignore
  const { NODE_ENV, DEV_DOMAIN, DEV_CLIENT_PORT, PROD_DOMAIN } = process.env as ENV;
  const domain = NODE_ENV === "development" ? `${DEV_DOMAIN}:${DEV_CLIENT_PORT}` : PROD_DOMAIN;
  const to = user.email;
  const subject = "Confirm Your Account";
  const html = `
    <h2>Thank you for creating an account!</h2>
    <a href="${domain}/#/account/confirm/${user.id}">
      <h3>Click here confirm you account</h3>
    </a>
  `;
  return sendEmail({ to, subject, html });
}