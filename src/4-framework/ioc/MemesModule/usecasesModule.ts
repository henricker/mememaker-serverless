import {
  CreateMemeUseCase,
  CreateMemeUseCaseToken,
} from '@business/usecases/meme/CreateMemeUseCase'
import {
  ProcessingMemeUseCase,
  ProcessingMemeUseCaseToken,
} from '@business/usecases/meme/ProcessingMemeUseCase'
import {
  SendMemeToMailUseCase,
  SendMemeToMailUseCaseToken,
} from '@business/usecases/meme/SendMemeToMailUseCase'
import { ContainerModule, interfaces } from 'inversify'

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateMemeUseCaseToken).to(CreateMemeUseCase)
  bind(ProcessingMemeUseCaseToken).to(ProcessingMemeUseCase)
  bind(SendMemeToMailUseCaseToken).to(SendMemeToMailUseCase)
})
