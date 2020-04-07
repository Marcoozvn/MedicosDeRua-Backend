const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/config/database');

let token;

describe('Form', () => {
  beforeAll(async () => {
    await database.model('User').create({
      name: 'Marcos Cesar',
      username: 'marcos',
      password: '123'
    });

    const response = await request(app).post('/login').send({
      username: 'marcos',
      password: '123'
    });

    token = response.body.token;
  });

  afterAll(async () => {
    database.model('AssistedUser').collection.drop();
    database.model('Anamnese').collection.drop();
    database.model('Return').collection.drop();
    database.model('User').collection.drop();
  });

  it('should be able to create a new anamnese form', async () => {
    const response = await request(app)
      .post('/form/anamnese')
      .set({
        authorization: `Bearer ${token}`
      })
      .send({
        paciente: {
          nome: 'Marcos',
          cpf: '000.000.000-00',
          dataNascimento: '07/03/1997',
          etnia: 'Pardo',
          cidadeNascimento: 'Patos',
          estadoNascimento: 'PB'
        },
        perfilSocioeconomico: {
          tempoNaRua: '>5 anos',
          costumaDormir: 'rua',
          comoGanhaDinheiro: 'Reciclagem'
        }
      });
    
    expect(response.body).toHaveProperty('_id');

  });
  
  it('should store the user after create a anamnese form', async () => {
    const user = await database.model('AssistedUser').findOne({ cpf: '000.000.000-00' });

    expect(user).toMatchObject({
      nome: 'Marcos',
      cpf: '000.000.000-00',
      dataNascimento: '07/03/1997'
    });
  });

  it('should be able to create a new return form', async () => {
    const response = await request(app)
      .post('/form/return')
      .set({
        authorization: `Bearer ${token}`
      })
      .send({
        paciente: {
          nome: 'Julia',
          cpf: '000.000.000-01',
          dataNascimento: '07/03/1997',
          etnia: 'Pardo',
          cidadeNascimento: 'Campina Grande',
          estadoNascimento: 'PB'
        },
        campo1: {
          campo2: '>5 anos',
          campo3: 'rua',
          campo4: 'Reciclagem'
        }
      });
    
    expect(response.body).toHaveProperty('_id');

  });
  
  it('should store the user after create a return form', async () => {
    const user = await database.model('AssistedUser').findOne({ cpf: '000.000.000-01' });

    expect(user).toMatchObject({
      nome: 'Julia',
      cpf: '000.000.000-01',
      dataNascimento: '07/03/1997'
    });
  });

  it('should be able to fetch forms for an user', async () => {
    const user = await database.model('AssistedUser').findOne({ cpf: '000.000.000-01' });
    const response = await request(app)
      .get(`/form/${user._id}`)
      .set({
        authorization: `Bearer ${token}` 
      })
      .send();
    
    expect(response.body).toHaveLength(1);
  })
})