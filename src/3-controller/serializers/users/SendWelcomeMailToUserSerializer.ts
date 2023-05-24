import { IsEmail, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

type SendWelcomeMailToUserParams = {
  name: string
  email: string
}

export class SendWelcomeMailToUserSerializer extends AbstractSerializer<SendWelcomeMailToUserParams> {
  @IsString({ message: 'name must be a string' })
  name: string

  @IsEmail({}, { message: 'email must be a valid email' })
  email: string
}
