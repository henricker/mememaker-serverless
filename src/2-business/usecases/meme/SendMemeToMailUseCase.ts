import { inject, injectable } from 'inversify'
import {
  IMailService,
  IMailServiceToken,
} from '@business/protocols/IMailService'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/users/IUserRepository'
import {
  IStorageService,
  IStorageServiceToken,
} from '@business/protocols/IStorageService'
import { IUseCase } from '../IUseCase'

type SendMemeToMailUseCaseInput = {
  userId: string
  memeUrl: string
}
type SendMemeToMailUseCaseOutput = Promise<void>

export const SendMemeToMailUseCaseToken = Symbol.for(
  'SendMemeToMailUseCaseToke'
)

@injectable()
export class SendMemeToMailUseCase
  implements IUseCase<SendMemeToMailUseCaseInput, SendMemeToMailUseCaseOutput>
{
  constructor(
    @inject(IMailServiceToken)
    private readonly mailService: IMailService,
    @inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @inject(IStorageServiceToken)
    private readonly storageService: IStorageService
  ) {}

  async exec(
    props: SendMemeToMailUseCaseInput
  ): Promise<SendMemeToMailUseCaseOutput> {
    const user = await this.userRepository.findById(props.userId)
    const html = this.generateMailHtml({
      email: user.email,
      memeUrl: props.memeUrl,
      name: user.name,
    })
    await this.mailService.sendMail({
      to: user.email,
      from: 'contato@serverless.com',
      html,
      subject: 'Seu meme foi processado com sucesso!',
    })
  }

  private generateMailHtml(input: {
    email: string
    name: string
    memeUrl: string
  }) {
    return `
    <html>
        <head>
        <title>Email de Boas-vindas da mememaker!</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
            color: #333;
            }
            p {
            color: #555;
            line-height: 1.5;
            }
            .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Olá! ${input.name}</h1>
            <p>Aqui está o meme que você gerou!</p>
            <img src="${input.memeUrl}"/>
        </div>
        </body>
    </html>
`
  }
}
