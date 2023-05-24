import { IUser } from '@domain/users/IUser'

export interface IUserRepository {
  create: (props: IUser) => Promise<void>
  findByEmail: (email: string) => Promise<IUser | null>
  findById: (id: string) => Promise<IUser | null>
}

export const IUserRepositoryToken = Symbol.for('IUserRepository')
