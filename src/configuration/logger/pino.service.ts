// https://github.com/iamolegga/nestjs-pino

import { ServerResponse } from 'http';
import { Params } from 'nestjs-pino';
import { trace, context } from '@opentelemetry/api';

type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export function customLogLevel(res: ServerResponse, err: Error): Level {
  if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
  if (res.statusCode >= 500 || err) return 'error';
  return 'info';
}

export const pinoParams: Params = {
  pinoHttp: {
    base: {
      _environment: process.env.NODE_ENV,
      timestamp: new Date().getTime(),
    },
    customLogLevel: customLogLevel,
    customSuccessMessage: () => 'request',
    formatters: {
      level: (label: string) => ({ level: label }),
      log(object: Record<string, unknown>) {
        const span = trace.getSpan(context.active());
        if (!span) return { ...object };

        const { spanId, traceId } = span.spanContext();
        return { ...object, spanId, traceId };
      },
    },
    messageKey: 'message',
    timestamp: false,
  },
};
