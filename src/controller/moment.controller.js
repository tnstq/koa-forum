const fs = require('fs')

const fileService = require('../service/file.service');
const momentService = require('../service/moment.service');

const {PICTURE_PATH} = require('../constants/file-path')

class MomentController {
    async create(ctx,next){
        // 1.获取数据(user_id,content,)
        const userId = ctx.user.id;
        const content = ctx.request.body.content;

        //2.将数据插入至数据库
        const result = await momentService.create(userId,content)
        ctx.body = result;
    }

    async detail(ctx,next){
        // 1.获取数据(momentId)
        const momentId = ctx.params.momentId;
        // 2.根据id查询数据
        const result = await momentService.getMomentById(momentId);
        ctx.body = result;
    }

    async list(ctx,next){
        //1.获取数据(offset/size)
        const {offset,size} = ctx.query;

        // 2.
        const result = await momentService.getMomentList(offset,size);
        ctx.body = result;

    }

    async update(ctx,next){
        const {momentId} = ctx.params;
        const {content} = ctx.request.body

        const result = await momentService.updated(content,momentId)
        ctx.body = result;
    }

    async remove(ctx,next){
        // 获取momentId
        const {momentId} = ctx.params;
        // 删除内容
        const result = await momentService.remove(momentId);
        ctx.body = result;
    }

    async addLabels(ctx,next){
        // 1.获取标签和动态id
        const {labels} = ctx;
        const {momentId} = ctx.params;
        // 2.添加所有标签
        for(let label of labels){
            //  判断标签是否以及和动态有关系
            const isExist = await momentService.hasLabel(momentId,label.id);
            if(!isExist){
                await momentService.addLabels(momentId,label.id)
            }
        }
        console.log(labels,momentId);
      ctx.body = "给动态添加标签~"
    }

    async fileInfo(ctx,next){
        let {filename} = ctx.params;
        const fileInfo = await fileService.getFileByFilename(filename);
        ctx.response.set('content-type', fileInfo.mimetype); 
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)

    }
}

module.exports = new MomentController