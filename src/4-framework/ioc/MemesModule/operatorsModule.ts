import { SendMemeToMailUseCaseToken } from '@business/usecases/meme/SendMemeToMailUseCase'
import {
  CreateMemeOperator,
  CreateMemeOperatorToken,
} from '@controller/operations/meme/CreateMemeOperator'
import {
  ProcessingMemeOperator,
  ProcessingMemeOperatorToken,
} from '@controller/operations/meme/ProcessingMemeOperator'
import {
  SendMemeToMailOperator,
  SendMemeToMailOperatorToken,
} from '@controller/operations/meme/SendMemeToMailOperator'
import { ContainerModule, interfaces } from 'inversify'

export const operatorsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateMemeOperatorToken).to(CreateMemeOperator)
  bind(ProcessingMemeOperatorToken).to(ProcessingMemeOperator)
  bind(SendMemeToMailOperatorToken).to(SendMemeToMailOperator)
})
