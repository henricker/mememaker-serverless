import {
  CreateMemeUseCase,
  CreateMemeUseCaseToken,
} from '@business/usecases/meme/CreateMemeUseCase'
import { ContainerModule, interfaces } from 'inversify'

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateMemeUseCaseToken).to(CreateMemeUseCase)
})
