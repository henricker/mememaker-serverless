import { inject, injectable } from 'inversify'
import {
  IMemeRepository,
  IMemeRepositoryToken,
} from '@business/repositories/meme/IMemeRepository'
import {
  IStorageService,
  IStorageServiceToken,
} from '@business/protocols/IStorageService'
import {
  IImageProcessorService,
  IImageProcessorServiceToken,
} from '@business/protocols/IImageProcessorService'
import { IUseCase } from '../IUseCase'

export const ProcessingMemeUseCaseToken = Symbol.for('ProcessingMemeUseCase')

type ProcessingMemeUseCaseInput = {
  meme: {
    createdAt: Date
    id: string
    underProcessing: boolean
    user_id: string
  }
  processImageParams: {
    urlImage: string
    topText: string
    bottomText: string
  }
}

type ProcessingMemeUseCaseOutput = Promise<void>

@injectable()
export class ProcessingMemeUseCase
  implements IUseCase<ProcessingMemeUseCaseInput, ProcessingMemeUseCaseOutput>
{
  constructor(
    @inject(IMemeRepositoryToken)
    private readonly memeRepository: IMemeRepository,
    @inject(IStorageServiceToken)
    private readonly storageService: IStorageService,
    @inject(IImageProcessorServiceToken)
    private readonly imageProcessorService: IImageProcessorService
  ) {}

  async exec(
    props: ProcessingMemeUseCaseInput
  ): Promise<ProcessingMemeUseCaseOutput> {
    const { meme, processImageParams } = props

    const { fileProcessed, filename } =
      await this.imageProcessorService.addTextOnImage({
        fileUrl: processImageParams.urlImage,
        topText: processImageParams.topText,
        bottomText: processImageParams.bottomText,
      })

    const { key, url } = await this.storageService.uploadFile({
      bucketName: 'mememakerimages',
      file: fileProcessed,
      fileName: filename,
    })

    await this.memeRepository.update({
      ...meme,
      underProcessing: false,
      key,
      url,
    })
  }
}
