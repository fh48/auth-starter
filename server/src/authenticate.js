const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const queries = require('./db/queries/users');

const createToken = requestBody => {
  return jsonwebtoken.sign(
    {user: requestBody.username, password: requestBody.password},
    'A very secret key'
  ); //Should be the same secret key as the one used is ./jwt.js
};

const isSamePasswort = (reqPassword, userPassword) =>
  bcrypt.compareSync(reqPassword, userPassword);

exports.registerUser = async ctx => {
  let newUser;

  try {
    newUser = await queries.registerUser(ctx.request.body);
  } catch (err) {
    if (err.code === '23505') {
      ctx.throw('username already exists');
    }
  }

  return {status: 'success', data: newUser};
};

exports.loginUser = async ctx => {
  const {request, response} = ctx;
  let user;

  try {
    user = await queries.getSingleUser(request.body.username);
  } catch (e) {
    ctx.throw(e);
  }

  // Throw an error if username doesn't exist, same message as wrong password due to security;
  ctx.assert(user, 401, 'Invalid username or password');
  // check if passwort is identical, else throw an error
  ctx.assert(
    isSamePasswort(request.body.password, user.password),
    401,
    'Invalid username or password'
  );

  user.token = createToken(request.body);

  return {status: 'success', data: user};
};

exports.logoutUser = async ctx => {
  // call updateUser and remove the token.
};
