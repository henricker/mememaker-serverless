import { ValidateAuthTokenSerializer } from '@controller/serializers/auth/ValidateAuthTokenSerializer'
import { inject, injectable } from 'inversify'
import {
  ValidateAuthTokenUseCase,
  ValidateAuthTokenUseCaseToken,
} from '@business/usecases/auth/ValidateAuthTokenUseCase'
import { AbstractOperator } from '../abstractOperator'

export const ValidateAuthTokenOperatorToken = Symbol.for(
  'ValidateAuthTokenOperator'
)

@injectable()
export class ValidateAuthTokenOperator extends AbstractOperator<
  ValidateAuthTokenSerializer,
  boolean
> {
  constructor(
    @inject(ValidateAuthTokenUseCaseToken)
    private readonly validateAuthTokenUseCase: ValidateAuthTokenUseCase
  ) {
    super()
  }

  run(input: ValidateAuthTokenSerializer): Promise<boolean> {
    this.exec(input)
    return this.validateAuthTokenUseCase.exec(input)
  }
}
