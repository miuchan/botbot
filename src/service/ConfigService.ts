import * as fs from 'fs';
import * as path from 'path';
import { Service } from 'typedi';

@Service()
export class ConfigService {
  public configs: any
  public config: any

  constructor() {
    if (process.env['CONFIG_FILE']) {
      this.configs = require(process.env['CONFIG_FILE'])
    } else if (fs.existsSync(path.join(__dirname, '..', '..', 'config.js'))) {
      this.configs = require(path.join(__dirname, '..', '..', 'config.js'))
    } else if (fs.existsSync(path.join(__dirname, '..', '..', 'config.default.js'))) {
      this.configs = require(path.join(__dirname, '..', '..', 'config.default.js'))
    } else {
      this.configs = {};
    }

    this.config = this.configs;
  }
}
