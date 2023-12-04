import { Controller, Get } from '@nestjs/common';
import { FeatureService } from './feature.service';

@Controller('feature')
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Get('/user')
  getUser() {
    return this.featureService.getUser();
  }

  @Get('/host')
  getHost() {
    return this.featureService.getHost();
  }
}
