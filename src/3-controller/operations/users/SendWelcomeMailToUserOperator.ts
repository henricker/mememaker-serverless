import { inject, injectable } from 'inversify'
import { SendWelcomeMailToUserSerializer } from '@controller/serializers/users/SendWelcomeMailToUserSerializer'
import {
  SendWelcomeMailToUserUseCase,
  SendWelcomeMailToUserUseCaseToken,
} from '@business/usecases/users/SendWelcomeMailToUserUseCase'
import { AbstractOperator } from '../abstractOperator'

export const SendWelcomeMailToUserOperatorToken = Symbol.for(
  'SendWelcomeMailToUserOperator'
)

@injectable()
export class SendWelcomeMailToUserOperator extends AbstractOperator<
  SendWelcomeMailToUserSerializer,
  void
> {
  constructor(
    @inject(SendWelcomeMailToUserUseCaseToken)
    private readonly sendWelcomeMailToUserUseCase: SendWelcomeMailToUserUseCase
  ) {
    super()
  }

  async run(input: SendWelcomeMailToUserSerializer): Promise<void> {
    this.exec(input)
    await this.sendWelcomeMailToUserUseCase.exec(input)
  }
}
