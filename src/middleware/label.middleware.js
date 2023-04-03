const service = require('../service/label.service')
const verifyLabelExists = async (ctx,next)=>{
    // 取出要添加的所有标签
    const {labels} = ctx.request.body;
    const newLabels = [];   
    // 判断每一个标签在label表中是否存在
    for(let name of labels){
        const hasLabel = await service.hasLabel(name);
        const label = {name};
        if(!hasLabel){
            // 创建标签数据
            const result = await service.create(name);  
            label.id = result.insertId
        }else{
            label.id = hasLabel.id;
        }
        newLabels.push(label);
    }
    // console.log(newLabels);
    ctx.labels = newLabels;
    await next();
}

module.exports = {
    verifyLabelExists
};  
