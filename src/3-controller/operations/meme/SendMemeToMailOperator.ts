import { SendMemeToMailSerializer } from '@controller/serializers/meme/SendMemeToMailSerializer'
import {
  SendMemeToMailUseCase,
  SendMemeToMailUseCaseToken,
} from '@business/usecases/meme/SendMemeToMailUseCase'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

export const SendMemeToMailOperatorToken = Symbol.for('SendMemeToMailOperator')

@injectable()
export class SendMemeToMailOperator extends AbstractOperator<
  SendMemeToMailSerializer,
  void
> {
  constructor(
    @inject(SendMemeToMailUseCaseToken)
    private readonly sendMemeToMailUseCase: SendMemeToMailUseCase
  ) {
    super()
  }

  async run(input: SendMemeToMailSerializer): Promise<void> {
    this.exec(input)
    await this.sendMemeToMailUseCase.exec(input)
  }
}
