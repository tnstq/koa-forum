// 登录/授权
const Router = require('koa-router');

const authRouter = new Router();

const {
  login
} = require('../controller/auth.controller');

const {verifyLogin} = require('../middleware/auth_middleware')

authRouter.post('/login',verifyLogin,login);

module.exports = authRouter;