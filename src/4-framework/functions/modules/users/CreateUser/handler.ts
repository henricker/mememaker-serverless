import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import {
  CreateUserOperator,
  CreateUserOperatorToken,
} from '@controller/operations/users/CreateUserOperator'
import { CreateUserSerializer } from '@controller/serializers/users/CreateUserSerializer'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { IError } from '@shared/IError'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const operator = container.get<CreateUserOperator>(CreateUserOperatorToken)
    const body = JSON.parse(event.body || '{}')
    const input = new CreateUserSerializer(body)
    await operator.run(input)
    return {
      statusCode: 201,
      body: null,
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
