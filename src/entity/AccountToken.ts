import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class AccountToken {

  @PrimaryColumn({
    type: "varchar",
    length: 64,
    unique: true,
  })
  token: string;

  @Column('bigint')
  expiresAt: number;

  @CreateDateColumn({type: "timestamp"})
	createdAt: Date;

	@UpdateDateColumn({type: "timestamp"})
	updatedAt: Date;

  @ManyToOne(() => Account, account => account.accountTokens)
  account: Account; 
}
