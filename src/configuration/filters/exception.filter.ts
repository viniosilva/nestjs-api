import {
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  constructor(
    @InjectPinoLogger(ExceptionFilter.name)
    private readonly logger: PinoLogger,
  ) {
    super();
  }

  catch(err: Error, host: ArgumentsHost): void {
    if (err instanceof HttpException) {
      super.catch(err, host);
    } else {
      const errJson = JSON.stringify(err, Object.getOwnPropertyNames(err));
      this.logger.error({ error: JSON.parse(errJson) }, 'error');

      const exception = new InternalServerErrorException(
        'Internal server error',
      );
      super.catch(exception, host);
    }
  }
}
