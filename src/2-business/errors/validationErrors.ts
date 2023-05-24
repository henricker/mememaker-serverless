import { IError } from '@shared/IError'

export const validationError = (details: any[]): IError =>
  new IError({
    message: details.map((detail) => detail.errors).join(', '),
  })
