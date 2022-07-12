import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Не вказанний пароль' })
	password: string;

	@IsString({ message: "Не вказане ім'я" })
	login: string;
}
