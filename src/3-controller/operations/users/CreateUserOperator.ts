import { CreateUserSerializer } from '@controller/serializers/users/CreateUserSerializer'
import {
  CreateUserUseCase,
  CreateUserUseCaseToken,
} from '@business/usecases/users/CreateUserUseCase'
import { inject } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

export const CreateUserOperatorToken = Symbol.for('CreateUserOperator')

export class CreateUserOperator extends AbstractOperator<
  CreateUserSerializer,
  void
> {
  constructor(
    @inject(CreateUserUseCaseToken)
    private readonly createUserUseCase: CreateUserUseCase
  ) {
    super()
  }

  async run(input: CreateUserSerializer): Promise<void> {
    this.exec(input)
    await this.createUserUseCase.exec(input)
  }
}
