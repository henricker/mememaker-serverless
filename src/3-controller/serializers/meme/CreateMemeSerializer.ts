import { IsString, IsUUID, IsUrl } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

type CreateMemeParams = {
  urlImage: string
  topText: string
  bottomText: string
  userId: string
}

export class CreateMemeSerializer extends AbstractSerializer<CreateMemeParams> {
  @IsUrl({ message: 'urlImage must be a valid URL' })
  urlImage: string

  @IsString({ message: 'topText must be a string' })
  topText: string

  @IsString({ message: 'bottomText must be a string' })
  bottomText: string

  @IsString({ message: 'userId must be a string' })
  @IsUUID('all', { message: 'userId must be a valid UUID' })
  userId: string
}
