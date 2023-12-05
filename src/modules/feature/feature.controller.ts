import { Controller, Get } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CfgService } from '../cfg/cfg.service';

@Controller('feature')
export class FeatureController {
  constructor(
    private featureService: FeatureService,
    private cfgService: CfgService,
  ) {}

  @Get('/user')
  getUser() {
    return this.featureService.getUser();
  }

  @Get('/host')
  getHost() {
    return this.featureService.getHost();
  }

  @Get('/url')
  getUrl() {
    return this.cfgService.get('url');
  }
}
