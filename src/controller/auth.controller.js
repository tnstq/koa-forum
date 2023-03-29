class AuthController {
    async login(ctx, next) {
        const { name } = ctx.request.body;
        console.log(ctx);
        ctx.body = `登录成功欢迎${name}回来`
    }
}

module.exports = new AuthController