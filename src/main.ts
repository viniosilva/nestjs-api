import './configuration/trace/opentelemetry.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { configureSwagger } from './configuration/api-docs/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  configureSwagger(app);

  const config = app.get(ConfigService);

  await app.listen(config.get('PORT'));
}
bootstrap();
