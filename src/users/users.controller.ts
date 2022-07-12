import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../commen/base.controller';
import { IUserController } from './users.controller.interface';
import 'reflect-metadata';
import { TYPES } from '../type';
import { ILogger } from '../logger/logger.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserModel } from '../models/user-model';
import { IUserService } from './users.service.interface';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
		]);
	}
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такий користувач вже існує.'));
		}
		// await UserModel.create({ password: body.password, login: body.login });
		this.ok(res, { login: result.login, id: result.id });
		// const result = await this.user
		// if(){
		// }
	}
}
