import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './type';
import 'reflect-metadata';
import { SequelizeService } from './database/sequelizeService';
// import connection from './database/database';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.SequelizeService) private sequelizeService: SequelizeService,
	) {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		await this.sequelizeService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущенний на http://localhost:${this.port}`);
	}
}
