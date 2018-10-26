const bcrypt = require('bcryptjs');
const knex = require('../connection');

const getAll = () => {
  return knex('users')
    .select('*')
    .returning('*');
};

const getSingleUser = username => {
  return knex('users')
    .where({username})
    .first()
    .returning('*');
};

const registerUser = async user => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  return knex('users')
    .insert({
      username: user.username,
      password: hash
    })
    .returning('*');
};

module.exports = {
  getAll,
  getSingleUser,
  registerUser
};
