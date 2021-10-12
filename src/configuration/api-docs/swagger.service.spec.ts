import { configureSwagger } from './swagger.service';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

describe('SwaggerService', () => {
  describe('configureSwagger', () => {
    it('should be successful', () => {
      jest.spyOn(SwaggerModule, 'createDocument').mockReturnValueOnce(null);
      jest.spyOn(SwaggerModule, 'setup').mockReturnValueOnce(null);

      const fn = () => configureSwagger({} as INestApplication);
      expect(fn).not.toThrow();
    });
  });
});
