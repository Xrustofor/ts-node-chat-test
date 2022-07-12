import { Model } from 'sequelize-typescript';
import { UserModel } from '../models/user-model';
import { User } from './user.entity';

export interface IUserSequelize {
	create: (user: Object) => Promise<UserModel | null>;
	find: (login: string) => Promise<Model | null>;
}
