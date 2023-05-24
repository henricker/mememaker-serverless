import { IHashServiceToken } from '@business/protocols/IHashService'
import { IIdGeneratorToken } from '@business/protocols/IIDGenerator'
import { IJwtServiceToken } from '@business/protocols/IJwtService'
import { IMailServiceToken } from '@business/protocols/IMailService'
import { BcryptAdapter } from '@framework/protocols/adapters/HashService/BcryptAdapter'
import { CryptoAdapter } from '@framework/protocols/adapters/IdGenerator/CryptoAdapter'
import { JSONWebTokenAdapter } from '@framework/protocols/adapters/JwtService/JsonWebTokenAdapter'
import { NodeMailerAdapter } from '@framework/protocols/adapters/MailService/NodeMailerAdapter'
import { ContainerModule, interfaces } from 'inversify'

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(IHashServiceToken).to(BcryptAdapter)
  bind(IIdGeneratorToken).to(CryptoAdapter)
  bind(IJwtServiceToken).to(JSONWebTokenAdapter)
  bind(IMailServiceToken).to(NodeMailerAdapter)
})
