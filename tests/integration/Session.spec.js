const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/config/database');

describe('Session', () => {
  beforeAll(async () => {
    await database.model('User').create({
      nome: 'Marcos Cesar',
      login: 'marcos',
      password: '123',
      papel: 'Tutor'
    });
  });

  afterAll(async () => {
    database.model('User').collection.drop();
  });

  it('should be able to make login', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        login: 'marcos',
        password: '123'
      });
    
    expect(response.body).toHaveProperty('token');
  });

  it('should reject incorrect username/password', async () => {
    const response = await request(app)
    .post('/login')
    .send({
      login: 'wrong',
      password: 'password'
    });
  
    expect(response.body).toMatchObject({
      message: 'Login/senha incorretos!'
    })
  })
})