import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { SequelizeService } from './database/sequelizeService';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './type';
import { IUserController } from './users/users.controller.interface';
import { UserController } from './users/users.controller';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
import { IUsersTokenService } from './users/users.token.interface';
import { UserTokenService } from './users/users.token.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<SequelizeService>(TYPES.SequelizeService).to(SequelizeService).inSingletonScope();
	bind<IUsersTokenService>(TYPES.IUsersTokenService).to(UserTokenService).inSingletonScope();
	bind<App>(TYPES.Aplication).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Aplication);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
