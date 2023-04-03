const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth_middleware');
const { create,list } = require('../controller/label.controller.js');

const lableRouter = new Router({prefix:'/label'});

lableRouter.post('/',verifyAuth,create)
// 展示标签的接口
lableRouter.get('/',list);

module.exports = lableRouter