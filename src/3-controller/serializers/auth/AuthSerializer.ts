import { IsEmail, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

type AuthSerializerParams = {
  email: string
  password: string
}

export class AuthSerializer extends AbstractSerializer<AuthSerializerParams> {
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string

  @IsString({ message: 'password must be a string' })
  password: string
}
