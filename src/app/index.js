const koa = require('koa');
const bodyParser = require('koa-bodyparser')

const useRouter = require('../router')

const errorHandler = require('./error-handle')

const app = new koa();

app.use(bodyParser())
useRouter(app)

app.on('error',errorHandler)

module.exports=app