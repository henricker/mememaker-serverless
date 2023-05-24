export interface IHashService {
  hash: (word: string) => Promise<string>
  compare: (word: string, wordhased: string) => Promise<boolean>
}

export const IHashServiceToken = Symbol.for('IHashService')
