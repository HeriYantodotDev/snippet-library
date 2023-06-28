import request from 'supertest';
import { app } from '../app';

describe('End Point: /helloworld', () => {
  test('returns 200, when hit endpoint /helloworld ', async() => {
    const response = await request(app).get('/helloworld');
    expect(response.status).toBe(200);
  });

  test('returns "Hello World, when hit endpoint /helloworld', async() => {
    const response = await request(app).get('/helloworld');
    // expect(response.text).toBe('Hello World');
    expect(response.body).toEqual({item:'Hello World'});
  });
});