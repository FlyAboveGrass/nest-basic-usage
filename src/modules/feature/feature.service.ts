import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeatureService {
  constructor(private configService: ConfigService) {}

  getUser() {
    const dbUser = this.configService.get<string>('DATABASE_USER');

    return dbUser;
  }

  getHost() {
    const dbHost = this.configService.get<string>('database.host');
    return dbHost;
  }
}
