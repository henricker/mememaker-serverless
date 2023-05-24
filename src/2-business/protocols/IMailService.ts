type sendMail = {
  to: string
  from: string
  subject: string
  html: string
}

export interface IMailService {
  sendMail: (input: sendMail) => Promise<void>
}

export const IMailServiceToken = Symbol.for('IMailService')
