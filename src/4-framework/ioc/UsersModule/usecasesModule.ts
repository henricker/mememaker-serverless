import {
  CreateUserUseCase,
  CreateUserUseCaseToken,
} from '@business/usecases/users/CreateUserUseCase'
import { ContainerModule, interfaces } from 'inversify'

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCaseToken).to(CreateUserUseCase)
})
