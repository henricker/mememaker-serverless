import { ValidateAuthTokenSerializer } from '@controller/serializers/auth/ValidateAuthTokenSerializer'
import { inject, injectable } from 'inversify'
import {
  ValidateAuthTokenUseCase,
  ValidateAuthTokenUseCaseToken,
} from '@business/usecases/auth/ValidateAuthTokenUseCase'
import { IUser } from '@domain/users/IUser'
import { AbstractOperator } from '../abstractOperator'

export const ValidateAuthTokenOperatorToken = Symbol.for(
  'ValidateAuthTokenOperator'
)

@injectable()
export class ValidateAuthTokenOperator extends AbstractOperator<
  ValidateAuthTokenSerializer,
  IUser
> {
  constructor(
    @inject(ValidateAuthTokenUseCaseToken)
    private readonly validateAuthTokenUseCase: ValidateAuthTokenUseCase
  ) {
    super()
  }

  run(input: ValidateAuthTokenSerializer): Promise<IUser> {
    this.exec(input)
    return this.validateAuthTokenUseCase.exec(input)
  }
}
