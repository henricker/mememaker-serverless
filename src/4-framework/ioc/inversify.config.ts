import { container } from '@shared/ioc/container'
import UsersModule from './UsersModule'
import AuthModule from './AuthModule'
import { servicesModule } from './servicesModule'

container.load(servicesModule)
UsersModule(container)
AuthModule(container)
