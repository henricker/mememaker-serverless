import {
  CreateMemeParams,
  IMemeRepository,
} from '@business/repositories/meme/IMemeRepository'
import { IMeme } from '@domain/meme/IMeme'
import { DynamoDB } from 'aws-sdk'
import { injectable } from 'inversify'

@injectable()
export class MemeRepository implements IMemeRepository {
  private readonly dynamo = new DynamoDB.DocumentClient()

  async create(props: CreateMemeParams): Promise<void> {
    await this.dynamo
      .put({
        TableName: 'memes',
        Item: { ...props, createdAt: props.createdAt.toISOString() },
      })
      .promise()
  }

  async update(input: Partial<IMeme>): Promise<void> {
    await this.dynamo
      .put({
        TableName: 'memes',
        Item: { ...input },
      })
      .promise()
  }
}
