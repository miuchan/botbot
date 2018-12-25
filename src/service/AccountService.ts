import { Service } from 'typedi';
import { getRepository, DeleteResult, UpdateResult } from "typeorm";
import * as _ from 'lodash';
import * as crypto from 'crypto';
import { Account } from '../entity/Account';
import { Password } from '../utilties/Password';

@Service()
export class AccountService {

  private accountRepository = getRepository(Account);

  public async findByEmail(email: string): Promise<Account> {
    return this.accountRepository.findOne({ email })
  }
  
  public async findByVerifyCode(verifyCode: string): Promise<Account> {
    return this.accountRepository.findOne({ verifyCode })
  }

  public async verifyAccount(accountId: number): Promise<UpdateResult> {
    return this.accountRepository.update(accountId, { emailVerified: true })
  }

  public async deleteByEmail(email: string): Promise<DeleteResult> {
    return this.accountRepository.delete({ email });
  }

  public async createAccountWithEmail(email: string, password: string): Promise<Account> {
    const account = new Account();
    account.email = email;
    account.password = await Password.hash(password);
    account.verifyCode = (await crypto.randomBytes(32)).toString('hex');
    account.verifyCodeExpiresAt = Date.now() + 3600 * 1000;
    this.accountRepository.save(account);
    return _.pick(account, ['id', 'email', 'profile']) as Account;
  }

  public async signinByPassword(email: string, password: string) {
    const account = await this.accountRepository.findOne({ email })
    if (!account) {
      return false
    }
    if(!await Password.compare(password, account.password)) {
      return false
    }

    return _.pick(account, ['id', 'email', 'profile']) as Account;
  }

  public async follow(account: Account, accountId: number): Promise<Account> {
    const reqAccount = await this.accountRepository.findOne({ id: account.id }, { relations: ["following"] })
    const accountToFollow = await this.accountRepository.findOne({ id: accountId })
    reqAccount.following.push(accountToFollow)
    return this.accountRepository.save(reqAccount)
  }

  public async unfollow(account: Account, accountId: number): Promise<DeleteResult> {
    return this.accountRepository
    .createQueryBuilder()
    .delete()
    .from('account_followers_account')
    .where('accountId_1 = :accountId AND accountId_2 = :id', { accountId, id: account.id })
    .execute();
  }
}