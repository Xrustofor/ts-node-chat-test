import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user-model';

const DB_NAME = 'chat';
const USER_NAME = 'root';
const PASSWORD = '';
const HOST = 'localhost';

const connection = new Sequelize({
	database: DB_NAME,
	dialect: 'mysql',
	username: USER_NAME,
	password: PASSWORD,
	host: HOST,
	models: [User],
});

export default connection;
