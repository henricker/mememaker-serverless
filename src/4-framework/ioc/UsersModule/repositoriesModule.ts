import { IUserRepositoryToken } from '@business/repositories/users/IUserRepository'
import { UserRepository } from '@framework/db/dynamo/users/UserRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoriesModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(IUserRepositoryToken).to(UserRepository)
  }
)
