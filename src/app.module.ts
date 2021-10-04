import './configuration/trace/opentelemetry.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './application/health/health.module';
import { pinoParams } from './configuration/logger/pino.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.config.env' }),
    LoggerModule.forRoot(pinoParams),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
