import { IImageProcessorService } from '@business/protocols/IImageProcessorService'
import jimp from 'jimp'
import crypto from 'crypto'
import { injectable } from 'inversify'

@injectable()
export class JimpAdapter implements IImageProcessorService {
  private readonly jimp = jimp

  async addTextOnImage(input: {
    fileUrl: string
    topText: string
    bottomText?: string
  }): Promise<{ fileProcessed: Buffer; filename: string }> {
    const imageDowloaded = (await this.jimp.read(input.fileUrl)).resize(
      330,
      330
    )
    const mimeType = imageDowloaded.getMIME()
    const filename = `${crypto.randomUUID()}.${mimeType}`.replace('image/', '')

    const font = await this.jimp.loadFont(this.jimp.FONT_SANS_16_BLACK)
    let print = imageDowloaded.print(font, 50, 20, input.topText.toUpperCase())

    if (input.bottomText) {
      print = print.print(
        font,
        50,
        imageDowloaded.getHeight() - 40,
        input.bottomText.toUpperCase()
      )
    }
    const buffer = await print.getBufferAsync(mimeType)
    return {
      filename,
      fileProcessed: buffer,
    }
  }
}
