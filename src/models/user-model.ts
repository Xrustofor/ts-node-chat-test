import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
	tableName: 'user',
})
export class User extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	login: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	email: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;
}
