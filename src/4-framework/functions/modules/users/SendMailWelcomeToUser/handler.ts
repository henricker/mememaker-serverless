import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import { DynamoDBStreamEvent } from 'aws-lambda'
import {
  SendWelcomeMailToUserOperator,
  SendWelcomeMailToUserOperatorToken,
} from '@controller/operations/users/SendWelcomeMailToUserOperator'
import { SendWelcomeMailToUserSerializer } from '@controller/serializers/users/SendWelcomeMailToUserSerializer'

export const handler = async (event: DynamoDBStreamEvent): Promise<void> => {
  const operator = container.get<SendWelcomeMailToUserOperator>(
    SendWelcomeMailToUserOperatorToken
  )
  await Promise.all(
    event.Records.map(async (record) => {
      const createdData = record.dynamodb?.NewImage || {}
      const input = new SendWelcomeMailToUserSerializer({
        email: createdData.email?.S || '',
        name: createdData.name?.S || '',
      })
      await operator.run(input)
      return record
    })
  )
}
