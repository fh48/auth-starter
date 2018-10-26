const bcrypt = require('bcryptjs');

exports.seed = async (knex, Promise) => {
  return knex('users')
    .del() // Deletes ALL existing entries
    .then(() => {
      const hash = bcrypt.hashSync('salt', bcrypt.genSaltSync());
      // Inserts seed entries one by one in series
      return knex('users').insert([
        {
          username: 'jeremy',
          password: hash
        },
        {
          username: 'flo',
          password: hash
        }
      ]);
    });
};
