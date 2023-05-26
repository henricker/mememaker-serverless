import { CreateMemeSerializer } from '@controller/serializers/meme/CreateMemeSerializer'
import { inject, injectable } from 'inversify'
import {
  CreateMemeUseCase,
  CreateMemeUseCaseToken,
} from '@business/usecases/meme/CreateMemeUseCase'
import { AbstractOperator } from '../abstractOperator'

export const CreateMemeOperatorToken = Symbol.for('ICreateMemeOperator')

@injectable()
export class CreateMemeOperator extends AbstractOperator<
  CreateMemeSerializer,
  void
> {
  constructor(
    @inject(CreateMemeUseCaseToken)
    private readonly createMemeUseCase: CreateMemeUseCase
  ) {
    super()
  }

  async run(input: CreateMemeSerializer): Promise<void> {
    this.exec(input)
    await this.createMemeUseCase.exec(input)
  }
}
