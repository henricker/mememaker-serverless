import { BusinessError } from '@business/errors/businessError'
import { IJwtService } from '@business/protocols/IJwtService'
import { injectable } from 'inversify'
import jsonwebtoken from 'jsonwebtoken'

@injectable()
export class JSONWebTokenAdapter implements IJwtService {
  verify(token: string): Promise<any> {
    try {
      const tokenPayload = jsonwebtoken.verify(token, process.env.JWT_SECRET)
      return Promise.resolve(tokenPayload)
    } catch (err) {
      if (err instanceof jsonwebtoken.TokenExpiredError) {
        throw new BusinessError('Invalid token', 401)
      }
    }
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err)
        }
        resolve(decoded)
      })
    })
  }
  sign(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
        (err, token) => {
          if (err) {
            reject(err)
          }
          resolve(token)
        }
      )
    })
  }
}
