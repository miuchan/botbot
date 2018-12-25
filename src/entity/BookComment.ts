import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Book } from './Book';

@Entity()
export class BookComment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn({type: "timestamp"})
	createdAt: Date;

	@UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

  @ManyToOne(() => Book, book => book.comments)
  book: Book;
}
