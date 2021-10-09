import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CatsController: POST /v1/cats', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be successful', () => {
    const payload = { birthday: '2000-11-20', name: 'Mimo' };
    return request(app.getHttpServer())
      .post('/v1/cats')
      .send(payload)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual({ ...payload, id: 1 });
      });
  });

  it('should throw Bad Request exception', () => {
    const payload = { birthday: '10-0-50' };
    return request(app.getHttpServer())
      .post('/v1/cats')
      .send(payload)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual({
          error: 'Bad Request',
          message: [
            'name must be a string',
            'birthday must be a valid ISO 8601 date string',
          ],
          statusCode: 400,
        });
      });
  });
});
