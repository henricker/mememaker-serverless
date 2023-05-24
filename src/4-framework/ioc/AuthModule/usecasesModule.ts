import {
  AuthUseCase,
  AuthUseCaseToken,
} from '@business/usecases/auth/AuthUseCase'
import {
  ValidateAuthTokenUseCase,
  ValidateAuthTokenUseCaseToken,
} from '@business/usecases/auth/ValidateAuthTokenUseCase'
import { ContainerModule, interfaces } from 'inversify'

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AuthUseCaseToken).to(AuthUseCase)
  bind(ValidateAuthTokenUseCaseToken).to(ValidateAuthTokenUseCase)
})
