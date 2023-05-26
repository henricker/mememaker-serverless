import { inject, injectable } from 'inversify'
import { IJwtService, IJwtServiceToken } from '@business/protocols/IJwtService'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/users/IUserRepository'
import { BusinessError } from '@business/errors/businessError'
import { IUser } from '@domain/users/IUser'
import { IUseCase } from '../IUseCase'

export const ValidateAuthTokenUseCaseToken = Symbol.for(
  'IValidateAuthTokenUseCase'
)

type ValidateAuthTokenUseCaseInput = {
  token: string
}

@injectable()
export class ValidateAuthTokenUseCase
  implements IUseCase<ValidateAuthTokenUseCaseInput, IUser>
{
  constructor(
    @inject(IJwtServiceToken)
    private readonly jwtService: IJwtService,
    @inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository
  ) {}

  async exec(props: ValidateAuthTokenUseCaseInput): Promise<IUser> {
    try {
      const payload = await this.jwtService.verify(props.token)
      const user = await this.userRepository.findById(payload.id)
      return user
    } catch (err) {
      if (err instanceof BusinessError) {
        return null
      }
      throw err
    }
  }
}
