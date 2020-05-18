# MedicosDeRua Backend

Backend da aplicação [MedicosDeRua](https://github.com/Marcoozvn/MedicosDeRua).

## Rodando a aplicação

### Com Docker

Com o Docker instalado em sua máquina: https://www.docker.com/get-started

No mesmo diretório do arquivo Dockerfile, execute:

* `docker-compose build`
* `docker-compose up`
  
Em seguida, a api estará disponível no endereço `http://localhost:3333`

O Mongo estará disponível no endereço `http://localhost:27017`. Para visualizar o estado do banco, você pode utilizar uma UI como o MongoDB Compass Community apontando para o `localhost:27017` (porta padrão do MongoDB).

#### Logs

Para acessar os logs pelo Graylog, execute: `docker-compose -f logger.yml up`

Em seguida, acesse o endereço `http://localhost:9000` 

### Sem Docker

1. Certifique-se que você possui o Nodejs instalado na sua máquina e uma instância do MongoDB rodando.
2. No diretório da aplicação, execute `npm i`
3. Execute o comando `npm run dev`

Em seguida, a api estará disponível no endereço `http://localhost:3333`

O Mongo estará disponível no endereço `http://localhost:27017`. Para visualizar o estado do banco, você pode utilizar uma UI como o MongoDB Compass Community apontando para o `localhost:27017` (porta padrão do MongoDB).

### Executando os testes

Os testes foram desenvolvidos utilizando o Frameword [Jest](https://jestjs.io/). Para executá-los, basta executar `npm run tests`

