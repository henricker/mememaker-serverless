import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import { DynamoDBStreamEvent } from 'aws-lambda'
import {
  SendMemeToMailOperator,
  SendMemeToMailOperatorToken,
} from '@controller/operations/meme/SendMemeToMailOperator'
import { SendMemeToMailSerializer } from '@controller/serializers/meme/SendMemeToMailSerializer'

export const handler = async (event: DynamoDBStreamEvent): Promise<void> => {
  const operator = container.get<SendMemeToMailOperator>(
    SendMemeToMailOperatorToken
  )
  await Promise.all(
    event.Records.map(async (record) => {
      const updatedData = record.dynamodb?.NewImage || {}
      if (!updatedData.underProcessing.BOOL) {
        const input = new SendMemeToMailSerializer({
          memeUrl: updatedData.url.S,
          userId: updatedData.user_id.S,
        })
        await operator.run(input)
      }
      return record
    })
  )
}
