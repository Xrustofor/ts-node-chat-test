import { inject, injectable } from 'inversify';
import { sign, SignOptions } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { TokenModel } from '../models/token-model';
import { TYPES } from '../type';
import { IUsersTokenService } from './users.token.interface';

@injectable()
export class UserTokenService implements IUsersTokenService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	public generateTokens(login: string, id: number) {
		const payload = { login, id };
		const accessKey = this.configService.get('JWT_ACCESS_SECRIT');
		const refreshKey = this.configService.get('JWT_FRESH_SECRIT');

		const accessToken = sign(payload, accessKey, { expiresIn: '1h' });
		const refreshToken = sign(payload, refreshKey, { expiresIn: '1d' });

		return { accessToken, refreshToken };
	}

	public async saveToken(id: number, refreshToken: string) {
		const token = await TokenModel.create({
			userId: id,
			refreshToken,
		});
		return token;
	}
}
