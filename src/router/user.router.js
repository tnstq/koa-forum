// 注册
const Router = require('koa-router')

const{
    create,
    avatarInfo
}=require('../controller/user.controller')

// 引入表单验证规则
const {verifyUser,handlePassword} = require('../middleware/user_middleware')

const userRouter = new Router({prefix:'/users'});


userRouter.post('/',verifyUser,handlePassword,create);
userRouter.get('/:userId/avatar',avatarInfo)

module.exports = userRouter