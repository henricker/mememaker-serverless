import { IMailService } from '@business/protocols/IMailService'
import { injectable } from 'inversify'
import nodemailer from 'nodemailer'

@injectable()
export class NodeMailerAdapter implements IMailService {
  private readonly transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
  async sendMail(input: {
    to: string
    from: string
    subject: string
    html: string
  }): Promise<void> {
    await this.transporter.sendMail({
      to: input.to,
      from: input.from,
      subject: input.subject,
      html: input.html,
    })
  }
}
