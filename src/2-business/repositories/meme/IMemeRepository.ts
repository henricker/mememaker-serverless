import { IMeme } from '@domain/meme/IMeme'

export type CreateMemeParams = Omit<IMeme, 'url' | 'key'>

export interface IMemeRepository {
  create: (input: CreateMemeParams) => Promise<void>
  update: (input: Partial<IMeme>) => Promise<void>
}

export const IMemeRepositoryToken = Symbol.for('IMemeRepository')
