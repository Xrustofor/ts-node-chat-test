// import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
// import { UserModel } from './user-model';
// @Table({
// 	tableName: 'users',
// })
// export class TokenModel extends Model {
// 	// @BelongsTo(() => UserModel, 'id')
// 	@Column({
// 		type: DataType.INTEGER,
// 	})
// 	userId: number;

// 	@Column({
// 		type: DataType.STRING,
// 		allowNull: false,
// 	})
// 	refreshToken: string;
// }

import {
	AllowNull,
	AutoIncrement,
	Column,
	ForeignKey,
	Model,
	NotEmpty,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { UserModel } from './user-model';

export interface IUserToken {
	id?: number | null;
	userId: number;
	refreshToken: string;
}

@Table({
	tableName: 'tokens',
	timestamps: true,
})
export class TokenModel extends Model implements IUserToken {
	@AutoIncrement
	@PrimaryKey
	@Column
	id?: number;

	@ForeignKey(() => UserModel)
	@AllowNull(false)
	@NotEmpty
	@Column
	userId!: number;

	@AllowNull(false)
	@NotEmpty
	@Column
	refreshToken!: string;
}
