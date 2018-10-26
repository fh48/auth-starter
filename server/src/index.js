const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = new Koa();
const PORT = process.env.PORT || 1337;

// body parser
app.use(bodyParser());

//   log messages not displayed when tests are ran.
if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

// error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(async (ctx, next) => {
  //TODO: Workarround for CORS problems

  ctx.set('Access-Control-Allow-Origin', 1234);
  ctx.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  ctx.set('Access-Control-Allow-Credentials', 'true');

  if (ctx.method === 'OPTIONS') {
    ctx.body = '';
    ctx.status = 200;
  }

  await next();
});

// routes
app.use(indexRoutes.routes());
app.use(authRoutes.routes());

// server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
