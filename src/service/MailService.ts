import { Service } from 'typedi';
import { createTransport, Transporter } from 'nodemailer';
import * as SendCloudTransport from 'nodemailer-sendcloud-transport';
import { ConfigService } from './ConfigService';

@Service()
export class MailService {
  private mailer: Transporter;

  constructor(
    private configService: ConfigService
  ) {
    this.mailer = createTransport(SendCloudTransport({
      auth: {
        api_key: this.configService.config.mail.apiKey,
        api_user: this.configService.config.mail.apiUser,
      },
    }))
  }

  public async send(mail: object) {
    return await this.mailer.sendMail(mail)
  }
}