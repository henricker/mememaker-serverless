import { IIdGenerator } from '@business/protocols/IIDGenerator'
import { injectable } from 'inversify'
import crypto from 'crypto'

@injectable()
export class CryptoAdapter implements IIdGenerator {
  generateId(): string {
    return crypto.randomUUID()
  }
}
