import { inject, injectable } from 'inversify'
import { AuthSerializer } from '@controller/serializers/auth/AuthSerializer'
import {
  AuthUseCase,
  AuthUseCaseToken,
} from '@business/usecases/auth/AuthUseCase'
import { AbstractOperator } from '../abstractOperator'

export const AuthOperatorToken = Symbol.for('AuthOperator')

@injectable()
export class AuthOperator extends AbstractOperator<
  AuthSerializer,
  Promise<string>
> {
  constructor(
    @inject(AuthUseCaseToken)
    private readonly authUseCase: AuthUseCase
  ) {
    super()
  }

  run(input: AuthSerializer): Promise<Promise<string>> {
    this.exec(input)
    return this.authUseCase.exec(input)
  }
}
