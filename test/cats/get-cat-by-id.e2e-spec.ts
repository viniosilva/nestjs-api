import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CatsController: GET /v1/cats/:catId', () => {
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
      .get(`/v1/cats/${cat.id}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toEqual(cat);
      });
  });

  it('should throw Not Found exception', async () => {
    return request(app.getHttpServer())
      .get('/v1/cats/1')
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
