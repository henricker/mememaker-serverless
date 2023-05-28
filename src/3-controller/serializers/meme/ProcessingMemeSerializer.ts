import { IMeme } from '@domain/meme/IMeme'
import { IsObject } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

type ProcessingMemeParams = {
  meme: IMeme
  processImageParams: {
    urlImage: string
    topText: string
    bottomText: string
  }
}

export class ProcessingMemeSerializer extends AbstractSerializer<ProcessingMemeParams> {
  @IsObject({ message: 'meme should be object' })
  meme: IMeme

  @IsObject({ message: 'processImageParams should be object' })
  processImageParams: {
    urlImage: string
    topText: string
    bottomText: string
  }
}
