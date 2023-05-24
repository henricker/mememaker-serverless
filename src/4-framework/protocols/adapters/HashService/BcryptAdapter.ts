import { IHashService } from '@business/protocols/IHashService'
import { injectable } from 'inversify'
import bcrypt from 'bcrypt'

@injectable()
export class BcryptAdapter implements IHashService {
  hash(word: string): Promise<string> {
    return bcrypt.hash(word, 8)
  }
  compare(word: string, wordhased: string): Promise<boolean> {
    return bcrypt.compare(word, wordhased)
  }
}
