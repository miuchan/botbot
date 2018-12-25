import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, RelationCount, JoinTable } from 'typeorm';
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
	
	@OneToMany(() => AccountToken, accountToken => accountToken.account)
	accountTokens: AccountToken[];

	@OneToOne(() => Profile, { eager: true })
	@JoinColumn()
	profile: Profile;

	@OneToMany(() => Status, status => status.account)
	status: Status[];
	
	@ManyToMany(() => Account, account => account.following, { cascade: true })
  @JoinTable()
  followers: Account[];

  @ManyToMany(() => Account, account => account.followers)
  following: Account[];

  @RelationCount((account: Account) => account.followers)
  followersCount: number;
  
  @RelationCount((account: Account) => account.following)
  followingCount: number;
}
