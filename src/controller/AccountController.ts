import * as Koa from 'koa';
import { JsonController, UseBefore, Param, Ctx, BodyParam, Get, Post } from "routing-controllers";
import { Service } from 'typedi';
import { AccountService } from '../service/AccountService';
import { AccountTokenService } from '../service/AccountTokenService';
import { MailService } from '../service/MailService';

@JsonController('/account')
@Service()
export class AccountController {
    constructor(
      private accountService: AccountService,
      private accountTokenService: AccountTokenService,
      private mailService: MailService
    ) {

    }
    @Post('/')
    async signup(
      @BodyParam("email", { required: true }) email: string,
      @BodyParam("password", { required: true }) password: string
    ) {
      const oldAccount = await this.accountService.findByEmail(email)
      if (oldAccount && oldAccount.emailVerified == true) {
        return { success: false, message: 'Account already exists.', displayMessage: '邮箱已存在，请直接登录。' }
      } 
      if (oldAccount && oldAccount.emailVerified == false) {
        await this.accountService.deleteByEmail(email)
      }
      const account = await this.accountService.createAccountWithEmail(email, password)
      const link = `http://127.0.0.1:3000/account/verify/${account.verifyCode}`
      const mail = {
          to: email,
          from: '书摘 <verify@shuzhai.com>',
          subject: '邮箱激活通知',
          html: `欢迎！${account.email}
          <p>感谢您在书摘的注册，请点击这里激活您的账号：<a href="${link}">${link}</a> (1小时内有效) 祝您使用愉快，使用过程中您有任何问题请及时联系我们。</p>`,
      };
      this.mailService.send(mail)
      return { success: true, message: 'Signup successfully.', displayMessage: '验证邮件已发送，请前往邮箱验证。' }
    }

    @Get('/verify/:verifyCode')
    async verifyEmail(
      @Param('verifyCode') verifyCode: string, 
      @Ctx() ctx: Koa.Context
    ) {
      const account = await this.accountService.findByVerifyCode(verifyCode)
      if (account.emailVerified || Date.now() > account.verifyCodeExpiresAt) {
        return { success: false, message: 'This email has been expired.', displayMessage: '邮件已过期。' };
      }
      await this.accountService.verifyAccount(account.id)
      const token = await this.accountTokenService.createSession(account)
      ctx.cookies.set(`user_token`, JSON.stringify(token))
      return { success: true, message: 'Verify successfully.', displayMessage: '验证成功。', data: token }
    }

    @Post('/signin')
    async signin(
      @BodyParam('email', { required: true }) email: string,
      @BodyParam('password', { required: true }) password: string,
      @Ctx() ctx: Koa.Context
    ) {
      const account = await this.accountService.signinByPassword(email, password)
      if (!account) {
        return { success: false, message: 'Wrong account or password.', displayMessage: '账号或密码错误。' }
      }
      const token = await this.accountTokenService.createSession(account)
      ctx.cookies.set(`user_token`, JSON.stringify(token))
      return { success: true, message: 'Signin successfully.', displayMessage: '登录成功。', data: token }
    }
}