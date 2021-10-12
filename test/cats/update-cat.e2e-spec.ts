import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CatsController: PATCH /v1/cats/:catId', () => {
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

  it('should be successful', async () => {
    const payload = { birthday: '2000-11-20', name: 'Mimo' };
    const res = await request(app.getHttpServer())
      .post('/v1/cats')
      .send(payload);
    const cat = res.body;

    return request(app.getHttpServer())
      .patch(`/v1/cats/${cat.id}`)
      .send({ birthday: '2000-11-19' })
      .expect(HttpStatus.NO_CONTENT);
  });

  it('should throw Bad Request exception', () => {
    const payload = { birthday: '10-0-50' };
    return request(app.getHttpServer())
      .patch('/v1/cats/1')
      .send(payload)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(({ body }) => {
        expect(body).toEqual({
          error: 'Bad Request',
          message: ['birthday must be a valid ISO 8601 date string'],
          statusCode: 400,
        });
      });
  });

  it('should throw Not Found exception', async () => {
    const payload = { birthday: '2000-11-20', name: 'Mimo' };
    return request(app.getHttpServer())
      .patch('/v1/cats/1')
      .send(payload)
      .expect(HttpStatus.NOT_FOUND)
      .expect(({ body }) => {
        expect(body).toEqual({
          error: 'Not Found',
          message: 'Cat 1 not found',
          statusCode: 404,
        });
      });
  });
});
