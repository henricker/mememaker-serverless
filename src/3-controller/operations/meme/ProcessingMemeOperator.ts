import { ProcessingMemeSerializer } from '@controller/serializers/meme/ProcessingMemeSerializer'
import { inject, injectable } from 'inversify'
import {
  ProcessingMemeUseCase,
  ProcessingMemeUseCaseToken,
} from '@business/usecases/meme/ProcessingMemeUseCase'
import { AbstractOperator } from '../abstractOperator'

export const ProcessingMemeOperatorToken = Symbol.for('ProcessingMemeOperator')

@injectable()
export class ProcessingMemeOperator extends AbstractOperator<
  ProcessingMemeSerializer,
  void
> {
  constructor(
    @inject(ProcessingMemeUseCaseToken)
    private readonly processingMemeUseCase: ProcessingMemeUseCase
  ) {
    super()
  }

  async run(input: ProcessingMemeSerializer): Promise<void> {
    this.exec(input)
    await this.processingMemeUseCase.exec(input)
  }
}
