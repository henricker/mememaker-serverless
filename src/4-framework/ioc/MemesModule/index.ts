import { Container } from 'inversify'
import { usecasesModule } from './usecasesModule'
import { operatorsModule } from './operatorsModule'
import { repositoriesModule } from './repositoriesModule'

export default (container: Container) => {
  container.load(repositoriesModule)
  container.load(usecasesModule)
  container.load(operatorsModule)
}
