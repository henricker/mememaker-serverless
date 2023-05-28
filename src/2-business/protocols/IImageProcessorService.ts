type addTextOnImageParams = {
  fileUrl: string
  topText: string
  bottomText?: string
}

export interface IImageProcessorService {
  addTextOnImage(input: addTextOnImageParams): Promise<{
    fileProcessed: Buffer
    filename: string
  }>
}

export const IImageProcessorServiceToken = Symbol.for('IImageProcessorService')
