import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../commen/base.controller';
import { IUserController } from './users.controller.interface';
import 'reflect-metadata';
import { TYPES } from '../type';
import { ILogger } from '../logger/logger.interface';
import { UserRegisterDto } from './dto/user-register.dto';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
		]);
	}
	register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		return null;
		// const result = await this.user
		// if(){
		// }
	}
}
