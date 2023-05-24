import { IUser } from '@domain/users/IUser'

import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/users/IUserRepository'
import { inject, injectable } from 'inversify'
import { BusinessError } from '@business/errors/businessError'
import {
  IHashService,
  IHashServiceToken,
} from '@business/protocols/IHashService'
import {
  IIdGenerator,
  IIdGeneratorToken,
} from '@business/protocols/IIDGenerator'
import { IUseCase } from '../IUseCase'

export const CreateUserUseCaseToken = Symbol.for('CreateUserUseCase')

type CreateUserUseCaseInput = Omit<IUser, 'id' | 'createdAt'>

@injectable()
export class CreateUserUseCase
  implements IUseCase<CreateUserUseCaseInput, void>
{
  constructor(
    @inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @inject(IHashServiceToken)
    private readonly hashService: IHashService,
    @inject(IIdGeneratorToken)
    private readonly idGenerator: IIdGenerator
  ) {}

  async exec(props: CreateUserUseCaseInput): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(props.email)
    if (existingUser) {
      throw new BusinessError('Email already in use')
    }
    await this.userRepository.create({
      ...props,
      id: this.idGenerator.generateId(),
      password: await this.hashService.hash(props.password),
      createdAt: new Date(),
    })
  }
}
