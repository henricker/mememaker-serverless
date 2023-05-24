export interface IQueueService {
  send: (input: { queue: string; message: string }) => Promise<void>
}

export const IQueueServiceToken = Symbol.for('IQueueService')
