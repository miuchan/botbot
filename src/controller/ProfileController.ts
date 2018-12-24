import * as Koa from 'koa';
import { JsonController, UseBefore, Param, Ctx, BodyParam, Get, Post, Body } from "routing-controllers";
import { Service } from 'typedi';
import { ProfileService } from '../service/ProfileService';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { Profile } from '../entity/Profile';

@JsonController('/profile')
@Service()
@UseBefore(AuthMiddleware)
export class ProfileController {
    constructor(
      private profileService: ProfileService,
    ) {

    }
    @Post('/')
    async update(
      @Body() profile: Profile,
      @Ctx() ctx: Koa.Context
    ) {
      return await this.profileService.updateProfile(ctx.account, profile)
    }
}