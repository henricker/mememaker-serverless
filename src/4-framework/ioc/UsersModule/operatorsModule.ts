import {
  CreateUserOperator,
  CreateUserOperatorToken,
} from '@controller/operations/users/CreateUserOperator'
import { ContainerModule, interfaces } from 'inversify'

export const operatorsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperatorToken).to(CreateUserOperator)
})
