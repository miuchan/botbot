import { KoaMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { AccountTokenService } from '../service/AccountTokenService';

@Service()
export class AuthMiddleware implements KoaMiddlewareInterface {
  constructor(
    private accountTokenService: AccountTokenService
  ) { 
  }

  async use(ctx: any, next: (err?: any) => Promise<any>): Promise<any> {
    const userToken = JSON.parse(ctx.cookies.get('user_token'))
    const isAuthed = await this.accountTokenService.authenticate(userToken.token)
    if (!isAuthed) {
      return ctx.throw(401, 'unauthorized')
    }
    ctx.account = userToken.account
    return next()
  }
}