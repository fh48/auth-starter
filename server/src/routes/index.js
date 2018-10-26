const Router = require('koa-router');
const router = new Router();

//const jwt = require('../jwt');

router.get('/', async ctx => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
});

module.exports = router;
