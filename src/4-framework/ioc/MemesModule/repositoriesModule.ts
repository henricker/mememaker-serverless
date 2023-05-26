import { IMemeRepositoryToken } from '@business/repositories/meme/IMemeRepository'
import { MemeRepository } from '@framework/db/dynamo/memes/memeRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoriesModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(IMemeRepositoryToken).to(MemeRepository)
  }
)
