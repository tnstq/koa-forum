const Router = require('koa-router');

const {
    verifyAuth
} = require('../middleware/auth_middleware')

const {
    avatarHandler,
    pictureHandler
} = require('../middleware/file_middleware')

const {
    saveAvatarInfo,
    savePictureInfo
} = require('../controller/file.controller')

const fileRouter = new Router({prefix:'/upload'});

fileRouter.post('/avatar',verifyAuth,avatarHandler,saveAvatarInfo)
fileRouter.post('/picture',verifyAuth,pictureHandler,savePictureInfo)

module.exports = fileRouter;