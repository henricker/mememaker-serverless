import {
  CreateMemeOperator,
  CreateMemeOperatorToken,
} from '@controller/operations/meme/CreateMemeOperator'
import {
  ProcessingMemeOperator,
  ProcessingMemeOperatorToken,
} from '@controller/operations/meme/ProcessingMemeOperator'
import { ContainerModule, interfaces } from 'inversify'

export const operatorsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateMemeOperatorToken).to(CreateMemeOperator)
  bind(ProcessingMemeOperatorToken).to(ProcessingMemeOperator)
})
