import { IHashServiceToken } from '@business/protocols/IHashService'
import { IIdGeneratorToken } from '@business/protocols/IIDGenerator'
import { IImageProcessorServiceToken } from '@business/protocols/IImageProcessorService'
import { IJwtServiceToken } from '@business/protocols/IJwtService'
import { IMailServiceToken } from '@business/protocols/IMailService'
import { IQueueServiceToken } from '@business/protocols/IQueueService'
import { IStorageServiceToken } from '@business/protocols/IStorageService'
import { BcryptAdapter } from '@framework/protocols/adapters/HashService/BcryptAdapter'
import { CryptoAdapter } from '@framework/protocols/adapters/IdGenerator/CryptoAdapter'
import { JimpAdapter } from '@framework/protocols/adapters/ImageProcessorService/JimpAdapter'
import { JSONWebTokenAdapter } from '@framework/protocols/adapters/JwtService/JsonWebTokenAdapter'
import { NodeMailerAdapter } from '@framework/protocols/adapters/MailService/NodeMailerAdapter'
import { SqsAdapter } from '@framework/protocols/adapters/QueueService/SqsAdapter'
import { S3Adapter } from '@framework/protocols/adapters/StorageService/S3Adapter'
import { ContainerModule, interfaces } from 'inversify'

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(IHashServiceToken).to(BcryptAdapter)
  bind(IIdGeneratorToken).to(CryptoAdapter)
  bind(IJwtServiceToken).to(JSONWebTokenAdapter)
  bind(IMailServiceToken).to(NodeMailerAdapter)
  bind(IQueueServiceToken).to(SqsAdapter)
  bind(IStorageServiceToken).to(S3Adapter)
  bind(IImageProcessorServiceToken).to(JimpAdapter)
})
