import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleGuard } from './guard/role/role.guard';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RoleGuard());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
