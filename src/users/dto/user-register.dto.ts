import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Не вірно вказаний емейл' })
	email: string;

	@IsString({ message: 'Не вказанний пароль' })
	password: string;

	@IsString({ message: "Не вказане ім'я" })
	name: string;
}
