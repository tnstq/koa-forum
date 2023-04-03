const fileService = require('../service/file.service')
const {AVATAR_PATH} = require('../constants/file-path');
const userService = require('../service/user.service');

class FileController {
    async saveAvatarInfo(ctx,next){
        // 获取图像相关的信息
        const {filename,mimetype,size} = ctx.req.file;
        const {id} = ctx.user;
        // 将图像信息数据保存到数据库中
        const result = await fileService.createAvatar(filename,mimetype,size,id);
        // 将图片地址存到users表中
        const avatarUrl = `http://127.0.0.1:8000/users/${id}/avatar`;
        await userService.updateAvatarUrlById(avatarUrl,id);
        // 返回结果
        ctx.body = {
            status:200,
            msg:"用户上传头像成功~"
        };
    }

    async savePictureInfo(ctx,next){
        // 获取图片信息
        const files = ctx.req.files;
        const {id} = ctx.user
        const {momentId} = ctx.query;
        // 将文件信息保存到数据库
        for(let file of files){
            const {filename,mimetype,size} = file;
            await fileService.createFile(filename,mimetype,size,id,momentId);
        }

        ctx.body = "动态配图上传完成~"
        

    }
}

module.exports = new FileController();