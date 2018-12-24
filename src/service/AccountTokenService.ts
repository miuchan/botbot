import { Service } from 'typedi';
import { getRepository } from "typeorm";
import * as _ from 'lodash'
import { AccountToken } from '../entity/AccountToken';
import { Account } from '../entity/Account';
import { Random } from '../utilties/Random';

@Service()
export class AccountTokenService {

  private accountRepository = getRepository(Account);
  private accountTokenRepository = getRepository(AccountToken);

  public async authenticate(token: string): Promise<boolean> {
    const userToken = await this.accountTokenRepository.findOne(token)
    return userToken && userToken.expiresAt > Date.now()
  }

  public async createSession(account: Account): Promise<AccountToken> {
    const accountToken = new AccountToken()
    accountToken.token = Random.patternCryptographically(64, Random.patternAlphabetNumber);
    accountToken.expiresAt = Date.now() + 3600 * 1000
    accountToken.account = account
    await this.accountTokenRepository.save(accountToken)
    return accountToken
  }
  
}