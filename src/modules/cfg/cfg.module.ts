import { DynamicModule, Module } from '@nestjs/common';
import { CfgService } from './cfg.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CfgService],
})
export class CfgModule {
  static register(options): DynamicModule {
    return {
      module: CfgModule,
      providers: [
        {
          provide: 'CFG_OPTION',
          useValue: options,
        },
        CfgService,
      ],
      exports: [CfgService],
    };
  }
}
