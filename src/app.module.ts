import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './application/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.config.env' }), HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
