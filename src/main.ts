import './configuration/trace/opentelemetry.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const config = app.get(ConfigService);

  await app.listen(config.get('PORT'));
}
bootstrap();
