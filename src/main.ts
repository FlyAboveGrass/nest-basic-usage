import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleGuard } from './guard/role/role.guard';
import { LoggingInterceptor } from './interceptors/logging/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as morgan from 'morgan';
import helmet from 'helmet';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

declare const module: any;

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: true,
    },
  );

  // helmet 是一个 Node.js 的中间件，它用于帮助你设置一些 HTTP 头部，以实现一些安全性的最佳实践。
  // 这些头部可以帮助你防止一些已知的 Web 攻击，如跨站脚本攻击（XSS）、点击劫持等。
  app.use(helmet());

  app.useGlobalGuards(new RoleGuard());
  app.useGlobalInterceptors(new LoggingInterceptor()); // 全局共用该示例
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局限流
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // 限制15分钟内最多只能访问100次
    }),
  );

  // 启用gzip压缩
  app.use(compression());

  // 全局日志
  app.use(morgan('combined'));

  // 全局版本控制
  app.enableVersioning();

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动去除不在 DTO 中的属性
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // 设置了当验证失败时返回的 HTTP 状态码。
      transform: true, // 自动将请求对象转换为 DTO 类的实例。
      dismissDefaultMessages: true, // 禁用默认的错误消息，这样你就可以提供自定义的错误消息。
      // 当验证失败时，会抛出一个 UnprocessableEntityException，并将验证错误作为参数传入。
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return app;
}
bootstrap();
