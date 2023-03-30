const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
class AuthController {
    async login(ctx, next) {
        const { id, name } = ctx.user;
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            // 密钥在9版本小于2048位的需要使用此属性
            allowInsecureKeySizes:true,
            // 有效时间，单位s
            expiresIn: 60 * 60 * 24,
            // 加密算法
            algorithm: 'RS256'
        });
        
        ctx.body = {
            id,
            name,
            token
        }
        console.log(ctx);
        // ctx.body = `登录成功欢迎${name}回来`
    }

    async success(ctx,next){
        ctx.body = "授权成功~"
    }
}

module.exports = new AuthController