import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './type';
import { json } from 'body-parser';
import 'reflect-metadata';
import { SequelizeService } from './database/sequelizeService';
import { IConfigService } from './config/config.service.interface';
import { UserController } from './users/users.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.SequelizeService) private sequelizeService: SequelizeService,
	) {
		this.app = express();
		this.port = 8000;
	}
	useMiddleware(): void {
		this.app.use(json());
	}

	userRoutes(): void {
		this.app.use('/users', this.userController.router);
	}
	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.userRoutes();
		this.useExeptionFilters();
		this.sequelizeService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущенний на http://localhost:${this.port}`);
	}
}
