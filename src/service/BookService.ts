import { Service } from 'typedi';
import { getRepository } from "typeorm";
import { Book } from '../entity/Book';

@Service()
export class BookService {

  private bookRepository = getRepository(Book);

  public async addBook(book: Book) {
    return this.bookRepository.insert(book);
  }

  public async updateBook(id: number, book: Book) {
    return this.bookRepository.update(id, book)
  }
}
