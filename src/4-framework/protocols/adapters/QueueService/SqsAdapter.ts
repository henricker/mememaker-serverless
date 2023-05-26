import { IQueueService } from '@business/protocols/IQueueService'
import { injectable } from 'inversify'
import { SQS } from 'aws-sdk'

@injectable()
export class SqsAdapter implements IQueueService {
  private readonly queueBaseUrl = `https://sqs.us-east-1.amazonaws.com/${process.env.ACCOUNT_ID}`
  private readonly sqs = new SQS()
  async send(input: { queue: string; message: string }): Promise<void> {
    await this.sqs
      .sendMessage({
        QueueUrl: `${this.queueBaseUrl}/${input.queue}`,
        MessageBody: input.message,
      })
      .promise()
  }
}
