import * as Koa from 'koa';
import { JsonController, UseBefore, Ctx, Get, Post, Body, Put, BodyParam } from "routing-controllers";
import { Service } from 'typedi';
import { BookService } from '../service/BookService';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { Book } from '../entity/Book';

@JsonController('/book')
@Service()
@UseBefore(AuthMiddleware)
export class BookController {
    constructor(
      private bookService: BookService,
    ) {

    }
    @Post('/')
    async add(
      @Body() book: Book
    ) {
      return await this.bookService.addBook(book)
    }

    @Put('/')
    async update(
      @Body() book: Book
    ) {
      return await this.bookService.updateBook(book.id, book);
    }
}