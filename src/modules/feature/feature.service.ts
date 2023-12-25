import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeatureService {
  constructor(private configService: ConfigService) {}

  getUser() {
    const dbUser = this.configService.get<string>('DB_USERNAME');

    return dbUser;
  }

  getHost() {
    const dbHost = this.configService.get<string>('DB_PORT');
    return dbHost;
  }
}
