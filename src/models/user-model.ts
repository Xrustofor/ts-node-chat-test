// import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

// @Table({
// 	tableName: 'users',
// })
// export class UserModel extends Model {
// 	@Column({
// 		type: DataType.INTEGER,
// 		primaryKey: true,
// 	})
// 	id: number;

// 	@Column({
// 		type: DataType.STRING,
// 		allowNull: false,
// 	})
// 	login: string;

// 	@Column({
// 		type: DataType.STRING,
// 		allowNull: false,
// 	})
// 	password: string;
// }

import {
	AllowNull,
	AutoIncrement,
	Column,
	Model,
	NotEmpty,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';

export interface IUser {
	id?: number | null;
	login: string;
	password: string;
}

@Table({
	tableName: 'user',
	timestamps: true,
})
export class UserModel extends Model implements IUser {
	@AutoIncrement
	@PrimaryKey
	@Column
	id?: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	login!: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	password!: string;
}
