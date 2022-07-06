import { UserRegisterDto } from './dto/user-register.dto';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<null>;
}
