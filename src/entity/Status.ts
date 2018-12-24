import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Status {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @CreateDateColumn({type: "timestamp"})
	createdAt: Date;

	@UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

  @ManyToOne(type => Account, account => account.status)
  account: Account;
}
