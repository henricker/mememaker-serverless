export interface IJwtService {
  sign: (payload: any) => Promise<string>
  verify: (token: string) => Promise<any>
}

export const IJwtServiceToken = Symbol.for('IJwtService')
