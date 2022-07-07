import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user-model';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../type';

const DB_NAME = 'chat';
const USER_NAME = 'root';
const PASSWORD = '';
const HOST = 'localhost';

@injectable()
export class SequelizeService {
	client: Sequelize;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new Sequelize({
			database: DB_NAME,
			dialect: 'mysql',
			username: USER_NAME,
			password: PASSWORD,
			host: HOST,
			models: [User],
		});
	}

	async connect(): Promise<void> {
		try {
			this.client
				.sync()
				.then(() => {
					this.logger.log(`[Sequelize] База данних запущена`);
				})
				.catch((err) => {
					if (err instanceof Error) {
						this.logger.log('[Sequelize] помилка підключення до БД ' + err.message);
					}
				});
		} catch (err) {
			if (err instanceof Error) {
				this.logger.log('[Sequelize] помилка підключення до БД ' + err.message);
			}
		}
	}
}
