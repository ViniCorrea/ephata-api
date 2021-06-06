import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { readFileSync } from 'fs';
import { CreateUserDto } from 'dist/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/users/register (POST)', () => {
    const users: {
      dto: CreateUserDto;
      type: string;
      status: number;
      response: string;
      responseRegex: string;
    }[] = JSON.parse(
      readFileSync('./seeders/users.register.json').toString('utf-8'),
    );
    const results = [];
    for (const user of users) {
      const req = request(app.getHttpServer()).post('/users/register');
      if (user.type) {
        req.type(user.type);
      }
      if (user.status) {
        req.expect(user.status);
      }
      if (user.response) {
        req.expect(user.response);
      }
      if (user.dto) {
        req.send(user.dto);
      }
      results.push(results);
    }
    return results;
  });
});
