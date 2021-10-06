import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './application/health/health.module';
import { pinoParams } from './configuration/logger/pino.service';
import { CatsModule } from './application/cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.config.env' }),
    LoggerModule.forRoot(pinoParams),
    HealthModule,
    CatsModule,
  ],
})
export class AppModule {}
