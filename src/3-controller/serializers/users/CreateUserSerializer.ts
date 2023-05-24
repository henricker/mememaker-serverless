import { IsEmail, IsString, Matches } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

type CreateUserSerializerParams = {
  name: string
  email: string
  password: string
}

export class CreateUserSerializer extends AbstractSerializer<CreateUserSerializerParams> {
  @IsString({ message: 'name must be a string' })
  name: string

  @IsEmail({}, { message: 'email must be a valid email' })
  email: string

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'password must be at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
    }
  )
  password: string
}
