export interface IIdGenerator {
  generateId(): string
}

export const IIdGeneratorToken = Symbol.for('IIdGenerator')
