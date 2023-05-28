export type StorageServiceUploadParams = {
  file: Buffer
  fileName: string
  bucketName: string
}

export interface IStorageService {
  uploadFile(input: StorageServiceUploadParams): Promise<{
    key: string
    url: string
  }>
}

export const IStorageServiceToken = Symbol.for('IStorageService')
