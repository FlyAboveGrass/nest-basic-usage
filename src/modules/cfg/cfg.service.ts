import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envNameMap } from './configs/development.config';

@Injectable()
export class CfgService {
  private envConfig;

  constructor(
    @Inject('CFG_OPTION') option,
    private configService: ConfigService,
  ) {
    this.envConfig = envNameMap[this.configService.get('env')];
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
