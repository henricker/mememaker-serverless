import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import {
  AuthOperator,
  AuthOperatorToken,
} from '@controller/operations/auth/AuthOperator'
import { AuthSerializer } from '@controller/serializers/auth/AuthSerializer'
import { IError } from '@shared/IError'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const operator = container.get<AuthOperator>(AuthOperatorToken)
    const body = JSON.parse(event.body || '{}')
    const input = new AuthSerializer(body)
    const token = await operator.run(input)
    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
      }),
    }
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
