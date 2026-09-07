import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
}

bootstrap().catch((error) => {
  console.error('Fatal startup error', error);
  if (process.env.GARAGEBENCH_DESKTOP === '1') {
    return;
  }
  process.exit(1);
});
