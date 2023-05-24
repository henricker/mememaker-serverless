import {
  CreateUserOperator,
  CreateUserOperatorToken,
} from '@controller/operations/users/CreateUserOperator'
import {
  SendWelcomeMailToUserOperator,
  SendWelcomeMailToUserOperatorToken,
} from '@controller/operations/users/SendWelcomeMailToUserOperator'
import { ContainerModule, interfaces } from 'inversify'

export const operatorsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperatorToken).to(CreateUserOperator)
  bind(SendWelcomeMailToUserOperatorToken).to(SendWelcomeMailToUserOperator)
})
