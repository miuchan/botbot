import { Entity, OneToMany, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BookComment } from './BookComment';

@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  subtitle: string;

  @Column({
    nullable: true,
  })
  cover: string;

  @Column()
  author: string;

  @CreateDateColumn({type: "timestamp"})
	createdAt: Date;

	@UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

  @OneToMany(type => BookComment, comment => comment.book)
  comments: BookComment[];
}
