import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { ConfigModule } from '@nestjs/config';
import { FeatureController } from './feature.controller';
import { CfgModule } from '../cfg/cfg.module';

@Module({
  imports: [ConfigModule, CfgModule.register({ folder: './configs' })],
  providers: [FeatureService],
  controllers: [FeatureController],
})
export class FeatureModule {}
