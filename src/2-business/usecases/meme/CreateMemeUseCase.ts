import { inject, injectable } from 'inversify'
import {
  IQueueService,
  IQueueServiceToken,
} from '@business/protocols/IQueueService'
import {
  IMemeRepository,
  IMemeRepositoryToken,
} from '@business/repositories/meme/IMemeRepository'
import {
  IIdGenerator,
  IIdGeneratorToken,
} from '@business/protocols/IIDGenerator'
import { IUseCase } from '../IUseCase'

type CreateMemeUseCaseInput = {
  urlImage: string
  topText: string
  bottomText: string
  userId: string
}

export const CreateMemeUseCaseToken = Symbol.for('ICreateMemeUseCase')

@injectable()
export class CreateMemeUseCase
  implements IUseCase<CreateMemeUseCaseInput, void>
{
  constructor(
    @inject(IQueueServiceToken)
    private readonly queueService: IQueueService,
    @inject(IMemeRepositoryToken)
    private readonly memeRepository: IMemeRepository,
    @inject(IIdGeneratorToken)
    private readonly idGenerator: IIdGenerator
  ) {}

  async exec(props: CreateMemeUseCaseInput): Promise<void> {
    const memeId = this.idGenerator.generateId()
    await this.memeRepository.create({
      createdAt: new Date(),
      id: memeId,
      underProcessing: true,
      user_id: props.userId,
    })
    await this.queueService.send({
      queue: 'ProcessingMeme',
      message: JSON.stringify({
        memeId,
        urlImage: props.urlImage,
        topText: props.topText,
        bottomText: props.bottomText,
        userId: props.userId,
      }),
    })
  }
}
