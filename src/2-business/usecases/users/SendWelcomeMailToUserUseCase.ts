import { inject, injectable } from 'inversify'
import {
  IMailService,
  IMailServiceToken,
} from '@business/protocols/IMailService'
import { IUseCase } from '../IUseCase'

export const SendWelcomeMailToUserUseCaseToken = Symbol.for(
  'SendWelcomeMailToUserUseCase'
)

type SendWelcomeMailToUserUseCaseInput = {
  name: string
  email: string
}

type generateMailHtmlInput = {
  name: string
}

@injectable()
export class SendWelcomeMailToUserUseCase
  implements IUseCase<SendWelcomeMailToUserUseCaseInput, void>
{
  constructor(
    @inject(IMailServiceToken)
    private readonly mailService: IMailService
  ) {}

  async exec(props: SendWelcomeMailToUserUseCaseInput): Promise<void> {
    const html = this.generateMailHtml(props)
    await this.mailService.sendMail({
      to: props.email,
      from: 'contato@serverless.com',
      html,
      subject: 'Bem-vindo(a) à nossa plataforma',
    })
  }

  private generateMailHtml(input: generateMailHtmlInput) {
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
            <h1>Bem-vindo(a)! ${input.name}</h1>
            <p>Obrigado por se juntar a nós. Estamos animados para tê-lo(a) como parte da nossa comunidade de memes!.</p>
            <p>Para começar, clique no botão abaixo:</p>
            <a href="#" class="button">Criar memes</a>
        </div>
        </body>
    </html>
`
  }
}
