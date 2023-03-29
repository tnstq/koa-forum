// 进行md5加密
const crypot = require('crypto')
const md5password = (password) => {
    const md5 = crypot.createHash('md5');
    // 加密并转换为 16进制(hex)
    const result = md5.update(password).digest('hex');
    return result;
}

module.exports = md5password