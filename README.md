<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src=".github/assets/logo.svg" alt="Logo" width="160" height="160">
  </a>

  <h1 align="center">GoBarber</h1>

  <p align="center">
    App para gerenciamento da sua barbearia!
    <br />
  </p>
</p>

## Demo

<img src=".github/assets/GoBarberDemo.gif" alt="Logo">

### Tecnologias utilizadas

- Jest
- Typescript
- Node
- React
- React Native

### Requisitos

- Node 12 LTS
- Yarn
- React Native

- Bancos de Dados necessários:

  - PostgreSQL
  - MongoDB
  - Redis

- Conta na AWS (Para utilizar com a AWS):
  - Amazon S3
  - Amazon SES

### Testes

- Os testes poderão ser rodados através do comando `yarn test`

### Backend

- Rode o seguinte comando no terminal para instalar as dependências: `yarn`;
- Rode o seguinte comando no terminal para configurar o banco de dados Postgres: `yarn typeorm migration:run`;
- Há dois arquivos que precisarão ser configurados:
  - ormconfig.json (É necessário configurar para utilizar o postgres e mongodb);
  - .env
    - Há um arquivo chamado .env.example, renomeie ele para .env e altere as configurações conforme sua necessidade;
- Após confirmar que os bancos de dados estão no ar, poderá executar a API através do comando: `yarn dev:server`.

### Web

- Rode o seguinte comando no terminal para instalar as dependências: `yarn`;
- Verifique o arquivo localizado dentro da pasta src/services/api.ts o ip da API que está rodando;
- Rode o seguinte comando no terminal para executar a aplicação: `yarn`.

### Mobile

- Rode o seguinte comando no terminal para instalar as dependências: `yarn`;
- Verifique o arquivo localizado dentro da pasta src/services/api.ts o ip da API que está rodando;
- Rode o seguinte comando no terminal para executar a aplicação: `yarn android` ou `yarn ios`.
