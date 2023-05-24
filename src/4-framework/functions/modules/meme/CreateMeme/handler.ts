import '@framework/ioc/inversify.config'
import { authMiddleware } from '@framework/functions/middlewares/auth/VerifySession/middleware'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const createMemeHandler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => ({
  statusCode: 200,
  body: JSON.stringify({}),
})

export const handler = authMiddleware(createMemeHandler)
