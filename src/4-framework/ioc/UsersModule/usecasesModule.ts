import {
  CreateUserUseCase,
  CreateUserUseCaseToken,
} from '@business/usecases/users/CreateUserUseCase'
import {
  SendWelcomeMailToUserUseCase,
  SendWelcomeMailToUserUseCaseToken,
} from '@business/usecases/users/SendWelcomeMailToUserUseCase'
import { ContainerModule, interfaces } from 'inversify'

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCaseToken).to(CreateUserUseCase)
  bind(SendWelcomeMailToUserUseCaseToken).to(SendWelcomeMailToUserUseCase)
})
