const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/config/database');

describe('Session', () => {
  beforeAll(async () => {
    await database.model('User').create({
      name: 'Marcos Cesar',
      username: 'marcos',
      password: '123'
    });
  });

  afterAll(async () => {
    database.model('User').collection.drop();
  });

  it('should be able to make login', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'marcos',
        password: '123'
      });
    
    expect(response.body).toHaveProperty('token');
  });

  it('should reject incorrect username/password', async () => {
    const response = await request(app)
    .post('/login')
    .send({
      username: 'wrong',
      password: 'password'
    });
  
    expect(response.body).toMatchObject({
      message: 'Login/senha incorretos!'
    })
  })
})