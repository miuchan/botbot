import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  nickname: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  banner: string;

  @CreateDateColumn({type: "timestamp"})
	createdAt: Date;

	@UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
