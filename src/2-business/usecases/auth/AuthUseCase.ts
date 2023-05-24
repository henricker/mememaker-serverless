import { inject, injectable } from 'inversify'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/users/IUserRepository'
import { IJwtService, IJwtServiceToken } from '@business/protocols/IJwtService'
import {
  IHashService,
  IHashServiceToken,
} from '@business/protocols/IHashService'
import { BusinessError } from '@business/errors/businessError'
import { IUseCase } from '../IUseCase'

export const AuthUseCaseToken = Symbol.for('IAuthUseCase')

type AuthUseCaseInput = {
  email: string
  password: string
}

@injectable()
export class AuthUseCase
  implements IUseCase<AuthUseCaseInput, Promise<string>>
{
  constructor(
    @inject(IJwtServiceToken)
    private readonly jwtService: IJwtService,
    @inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @inject(IHashServiceToken)
    private readonly hashService: IHashService
  ) {}

  async exec(props: AuthUseCaseInput): Promise<Promise<string>> {
    const user = await this.userRepository.findByEmail(props.email)
    if (!user) {
      throw new BusinessError('Invalid credentials', 401)
    }
    const passwordMatch = await this.hashService.compare(
      props.password,
      user.password
    )
    if (!passwordMatch) {
      throw new BusinessError('Invalid credentials', 401)
    }
    const token = await this.jwtService.sign({
      id: user.id,
    })
    return token
  }
}
