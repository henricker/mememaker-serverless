import { IsString, IsUrl } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

type SendMemeToMailParams = {
  memeUrl: string
  userId: string
}

export class SendMemeToMailSerializer extends AbstractSerializer<SendMemeToMailParams> {
  @IsUrl({ message: 'memeUrl must be a valid URL' })
  memeUrl: string

  @IsString({ message: 'name must be a string' })
  userId: string
}
