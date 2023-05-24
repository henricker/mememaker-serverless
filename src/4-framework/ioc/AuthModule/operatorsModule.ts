import {
  AuthOperator,
  AuthOperatorToken,
} from '@controller/operations/auth/AuthOperator'
import {
  ValidateAuthTokenOperator,
  ValidateAuthTokenOperatorToken,
} from '@controller/operations/auth/ValidateAuthTokenOperator'
import { ContainerModule, interfaces } from 'inversify'

export const operatorsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AuthOperatorToken).to(AuthOperator)
  bind(ValidateAuthTokenOperatorToken).to(ValidateAuthTokenOperator)
})
