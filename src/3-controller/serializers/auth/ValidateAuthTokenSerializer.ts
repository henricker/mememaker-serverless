import { IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

type VerifyAuthTokenParams = {
  token: string
}

export class ValidateAuthTokenSerializer extends AbstractSerializer<VerifyAuthTokenParams> {
  @IsString({ message: 'password must be a string' })
  token: string
}
