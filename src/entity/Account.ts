import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { AccountToken } from './AccountToken';
import { Profile } from './Profile';
import { Status } from './Status';

@Entity()
export class Account {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	password: string;

	@Column({
			default: false,
	})
	emailVerified: boolean;

	@Column('bigint')
	verifyCodeExpiresAt: number;

	@Column({
		unique: true,
	})
	verifyCode: string;

	@CreateDateColumn({type: "timestamp"})
	createdAt: Date;

	@UpdateDateColumn({type: "timestamp"})
	updatedAt: Date;
	
	@OneToMany(type => AccountToken, accountToken => accountToken.account)
	accountTokens: AccountToken[];

	@OneToOne(type => Profile, { eager: true })
	@JoinColumn()
	profile: Profile;

	@OneToMany(type => Status, status => status.account)
  status: Status[];
}
