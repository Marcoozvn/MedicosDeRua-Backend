require('dotenv').config();
require('../../src/config/database');
const AssistedUserController = require('../../src/controllers/AssistedUserController');

describe('Extract user', () => {

  it('should extract an user of an form', async () => {
    const form = {
      paciente: {
        nome: 'Marcos',
        cpf: '000.000.000-00',
        dataNascimento: '07/03/1997'
      },

      campos: {
        campo1: 'Teste',
        campo2: 'Teste'
      }
    };

    const user = await AssistedUserController.extractUser(form);

    expect(user).toMatchObject({
      nome: 'Marcos',
      cpf: '000.000.000-00',
      dataNascimento: '07/03/1997'
    });
  });
});