import '@framework/ioc/inversify.config'
import { authMiddleware } from '@framework/functions/middlewares/auth/VerifySession/middleware'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { container } from '@shared/ioc/container'
import {
  CreateMemeOperator,
  CreateMemeOperatorToken,
} from '@controller/operations/meme/CreateMemeOperator'
import { CreateMemeSerializer } from '@controller/serializers/meme/CreateMemeSerializer'
import { IError } from '@shared/IError'

export const createMemeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { headers } = event
    const userId = headers?.['x-user-id']
    const operator = container.get<CreateMemeOperator>(CreateMemeOperatorToken)

    const body = JSON.parse(event.body || '{}')
    const input = new CreateMemeSerializer({ ...body, userId })
    await operator.run(input)

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Processing meme...',
      }),
    }
  } catch (err) {
    console.log(err)
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

export const handler = authMiddleware(createMemeHandler)
