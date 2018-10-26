const Router = require('koa-router');
const authenticate = require('../authenticate');
const queries = require('../db/queries/users');

const router = new Router();
const BASE_URL = `/api/v1/`;

/**
 *  returns a single user
 */
router.post(BASE_URL + 'auth/user', async ctx => {
  const {request, response} = ctx;
  let user;

  try {
    user = await queries.getSingleUser(request.body.username);
  } catch (err) {
    ctx.throw(err);
  }
  ctx.assert(user, 404, "User doesn't exist");

  ctx.response.body = {status: 'success', data: user};
});

/**
 *  returns all registered users
 */
router.get(BASE_URL + 'auth/all-user', async ctx => {
  let allUsers;

  try {
    allUsers = await queries.getAll();
  } catch (error) {
    ctx.throw(err);
  }
  ctx.response.body = {status: 'success', data: allUsers};
});

router.post(BASE_URL + 'auth/register', async ctx => {
  let newUser;

  try {
    newUser = await authenticate.registerUser(ctx);
  } catch (err) {
    ctx.throw(err);
  }

  ctx.response.body = newUser;
});

/**
 *  returns a user object with auth token
 */
router.post(BASE_URL + 'auth/login', async ctx => {
  let loggedInUser;

  try {
    loggedInUser = await authenticate.loginUser(ctx);
  } catch (err) {
    ctx.throw(err);
  }

  ctx.response.body = loggedInUser;
});

module.exports = router;
