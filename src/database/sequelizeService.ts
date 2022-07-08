import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user-model';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../type';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class SequelizeService {
	client: Sequelize;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.client = new Sequelize({
			database: this.configService.get('DB_NAME'),
			dialect: 'mysql',
			username: this.configService.get('DB_USER_NAME'),
			password: this.configService.get('DB_PASSWORD'),
			host: this.configService.get('DB_HOST'),
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
