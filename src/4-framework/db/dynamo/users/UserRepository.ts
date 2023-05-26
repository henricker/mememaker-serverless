import { IUserRepository } from '@business/repositories/users/IUserRepository'
import { IUser } from '@domain/users/IUser'
import { injectable } from 'inversify'
import { DynamoDB } from 'aws-sdk'

@injectable()
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    const { Items } = await this.dynamo
      .scan({
        TableName: 'users',
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id,
        },
      })
      .promise()
    if (!Items.length) return null
    const Item = Items[0]
    Item.createdAt = new Date(Item.createdAt)
    return Item as IUser
  }
  private readonly dynamo = new DynamoDB.DocumentClient()
  async create(props: IUser): Promise<void> {
    console.log(props)
    await this.dynamo
      .put({
        TableName: 'users',
        Item: { ...props, createdAt: props.createdAt.toISOString() },
      })
      .promise()
  }
  async findByEmail(email: string): Promise<IUser | null> {
    const { Items } = await this.dynamo
      .scan({
        TableName: 'users',
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email,
        },
      })
      .promise()
    if (!Items.length) return null
    return Items[0] as IUser
  }
}
