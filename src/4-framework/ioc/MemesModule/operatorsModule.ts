import {
  CreateMemeOperator,
  CreateMemeOperatorToken,
} from '@controller/operations/meme/CreateMemeOperator'
import { ContainerModule, interfaces } from 'inversify'

export const operatorsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateMemeOperatorToken).to(CreateMemeOperator)
})
