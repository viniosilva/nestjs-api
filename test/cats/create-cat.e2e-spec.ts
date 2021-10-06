import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CatsController (e2e)', () => {
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

  it('POST /v1/cats', () => {
    const payload = { birthday: '2000-11-20', name: 'Mimo' };
    return request(app.getHttpServer())
      .post('/v1/cats')
      .send(payload)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual({ ...payload, id: 1 });
      });
  });
});
