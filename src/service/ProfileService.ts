import { Service } from 'typedi';
import { getRepository, UpdateResult } from "typeorm";
import { Account } from '../entity/Account';
import { Profile } from '../entity/Profile';

@Service()
export class ProfileService {

  private profileRepository = getRepository(Profile);
  private accountRepository = getRepository(Account);

  public async updateProfile(account: Account, profile: Profile): Promise<Profile | UpdateResult> {
    if (!(account.profile && account.profile.id)) {
      account.profile = await this.profileRepository.save(profile)
      this.accountRepository.save(account)
      return account.profile
    } else {
      return this.profileRepository.update(account.profile.id, profile)
    }
    
  }
}
