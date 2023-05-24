import { IError } from '@shared/IError'

export class BusinessError extends IError {
  code: number
  constructor(message: string, code = 400) {
    super({
      message,
      statusCode: code,
    })
    this.code = code
  }
}
