import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleGuard } from './guard/role/role.guard';
import { LoggingInterceptor } from './interceptors/logging/logging.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RoleGuard());
  app.useGlobalInterceptors(new LoggingInterceptor()); // 全局共用该示例

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
