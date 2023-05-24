import { Container } from 'inversify'
import { usecasesModule } from './usecasesModule'
import { operatorsModule } from './operatorsModule'

export default (container: Container) => {
  container.load(usecasesModule)
  container.load(operatorsModule)
}
