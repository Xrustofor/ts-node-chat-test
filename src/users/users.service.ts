import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { UserModel } from '../models/user-model';
import { TYPES } from '../type';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { IUsersTokenService } from './users.token.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersTokenService) private tokenService: IUsersTokenService,
	) {}
	async createUser({ login, password }: UserRegisterDto) {
		const newUser = new User(login, password);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await UserModel.findOne({ where: { login: newUser.login } });
		if (existedUser) {
			return null;
		}
		const user = await UserModel.create({ login: newUser.login, password: newUser.password });
		const tokens = this.tokenService.generateTokens(user.login, 1);
		const { accessToken, refreshToken } = tokens;
		await this.tokenService.saveToken(1, refreshToken);

		return user;
	}
}
