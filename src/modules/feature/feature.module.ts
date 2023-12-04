import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { ConfigModule } from '@nestjs/config';
import { FeatureController } from './feature.controller';

@Module({
  imports: [ConfigModule],
  providers: [FeatureService],
  controllers: [FeatureController],
})
export class FeatureModule {}
