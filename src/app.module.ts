import { Dependencies, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { FeatureModule } from './modules/feature/feature.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // XXX: 不能用于生产环境，否则你可能会丢失数据
    }),
    CatsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    FeatureModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // 它用于自动将响应对象序列化为普通 JavaScript 对象，并应用 class-transformer 库的转换和排除规则。
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  private dataSource;

  constructor(dataSource) {
    this.dataSource = dataSource;
  }
}
