const fs = require('fs')

const fileService = require('../service/file.service');
const service = require('../service/user.service')

const {AVATAR_PATH} = require('../constants/file-path')

class UserController {
    async create(ctx, next) {
        //获取用户请求传递的参数
        const user = ctx.request.body;
        // console.log(ctx.request.body);
        //查询数据库
        const result = await service.create(user)

        //返回数据
        ctx.body = result;
    }

    // 头像相关
    async avatarInfo(ctx, next) {
        // 用户的头像文件
        const {userId} = ctx.params;
        const avatarInfo = await fileService.getAvatarByUserId(userId);
        ctx.response.set('content-type',avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)

    }


}

module.exports = new UserController();