import {
  IStorageService,
  StorageServiceUploadParams,
} from '@business/protocols/IStorageService'
import { injectable } from 'inversify'
import { S3 } from 'aws-sdk'

@injectable()
export class S3Adapter implements IStorageService {
  private readonly s3 = new S3({
    region: 'us-east-1',
  })

  async uploadFile(
    input: StorageServiceUploadParams
  ): Promise<{ key: string; url: string }> {
    const result = await this.s3
      .upload({
        Bucket: input.bucketName,
        Key: input.fileName,
        Body: input.file,
      })
      .promise()

    return {
      key: result.Key,
      url: result.Location,
    }
  }
}
