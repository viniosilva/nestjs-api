import { ServerResponse } from 'http';
import { trace } from '@opentelemetry/api';
import { customLogLevel, pinoParams } from './pino.service';

describe('LoggerService', () => {
  describe('customLogLevel', () => {
    it('should return info', () => {
      const res = { statusCode: 200 } as ServerResponse;
      const level = customLogLevel(res, null);
      expect(level).toEqual('info');
    });

    it('should return warn', () => {
      const res = { statusCode: 400 } as ServerResponse;
      const level = customLogLevel(res, null);
      expect(level).toEqual('warn');
    });

    it('should return error when error exists', () => {
      const res = { statusCode: 200 } as ServerResponse;
      const level = customLogLevel(res, new Error());
      expect(level).toEqual('error');
    });

    it('should return error when error not exists', () => {
      const res = { statusCode: 500 } as ServerResponse;
      const level = customLogLevel(res, null);
      expect(level).toEqual('error');
    });
  });

  describe('pinoParams.pinoHttp.customSuccessMessage', () => {
    it('should return "request"', () => {
      const message = pinoParams.pinoHttp.customSuccessMessage();

      expect(message).toEqual('request');
    });
  });

  describe('pinoParams.pinoHttp.formatters.level', () => {
    it('should return string level', () => {
      const message = pinoParams.pinoHttp.formatters.level('INFO');

      expect(message).toEqual({ level: 'INFO' });
    });
  });

  describe('pinoParams.pinoHttp.formatters.log', () => {
    it('should not get the trace', () => {
      const log = { message: 'hello' };
      const formattedLog = pinoParams.pinoHttp.formatters.log(log);

      expect(formattedLog).toEqual(log);
    });

    it('should get the trace', () => {
      const traceMock = { spanId: 'UUID', traceId: 'UUID' };
      jest.spyOn(trace, 'getSpan').mockReturnValueOnce({
        spanContext: () => traceMock,
      } as any);

      const log = { message: 'hello' };
      const formattedLog = pinoParams.pinoHttp.formatters.log(log);

      expect(formattedLog).toEqual({ ...traceMock, ...log });
    });
  });
});
