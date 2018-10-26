const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
  development: {
    client: 'pg',
    connection:
      'postgres://fabianhinsenkamp:sturmtruppen@localhost:5432/boilerplateusers',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds', 'development')
    }
  },
  test: {
    client: 'pg',
    connection:
      'postgres://fabianhinsenkamp:sturmtruppen@localhost:5432/boilerplateusers',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds', 'test')
    },
    pool: {
      min: 1,
      max: 2
    }
  }
};
