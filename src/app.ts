import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './type';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущенний на http://localhost:${this.port}`);
	}
}
