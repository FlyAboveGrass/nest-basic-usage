import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleGuard } from './guard/role/role.guard';
import { LoggingInterceptor } from './interceptors/logging/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new RoleGuard());
  app.useGlobalInterceptors(new LoggingInterceptor()); // 全局共用该示例
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局验证管道
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //   }),
  // );

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
