import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import {
  ValidateAuthTokenOperator,
  ValidateAuthTokenOperatorToken,
} from '@controller/operations/auth/ValidateAuthTokenOperator'
import { ValidateAuthTokenSerializer } from '@controller/serializers/auth/ValidateAuthTokenSerializer'
import { IError } from '@shared/IError'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda'

export const authMiddleware =
  (
    handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>
  ): APIGatewayProxyHandler =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const { headers } = event
      const type = headers?.Authorization?.split(' ')[0]
      const token = headers?.Authorization?.split(' ')[1]
      if (!token || type !== 'Bearer') {
        return {
          statusCode: 401,
          body: JSON.stringify({
            error: 'Unauthorized',
          }),
        }
      }
      const authMiddlewareOperator = container.get<ValidateAuthTokenOperator>(
        ValidateAuthTokenOperatorToken
      )
      const input = new ValidateAuthTokenSerializer({ token })
      const resultAuth = await authMiddlewareOperator.run(input)
      if (!resultAuth) {
        return {
          statusCode: 401,
          body: JSON.stringify({
            error: 'Unauthorized',
          }),
        }
      }
      return handler(event)
    } catch (err) {
      if (err instanceof IError) {
        return {
          statusCode: err.statusCode,
          body: JSON.stringify({
            error: err.message,
          }),
        }
      }
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Internal server error',
        }),
      }
    }
  }
