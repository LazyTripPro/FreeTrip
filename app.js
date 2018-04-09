/**
 * Created by rockey on 2018/3/14.
 */
const http = require('http')
const path = require('path');
const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const helmet = require('koa-helmet')
const Cookies = require('cookies');
const jwt = require('koa-jwt')
const config = require('config')
const requireDir = require('require-dir')
const serve = require('koa-static')
const logger = require('koa-logger')
const mount = require('koa-mount')
const render = require('koa-swig')
const co = require('co')
const {User} = require('./models/')

// middlewares
app.use(mount(serve(path.join(__dirname, 'public'))))
app.use(convert(logger()))

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 使用koa-swig渲染模板
app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: false, // disable, set to false 
  ext: 'html',
  writeBody: false
}))
// app.use(async ctx => ctx.body = await ctx.render('admin/user_index'))

//设置cookie
// const main = function(ctx, next) {
//   // ctx.cookies
//   let code = ctx.cookies.get('userInfo')
//   if (code) {
//     try {
//       // 获取当前登录用户的类型//是否是管理员
//       // 只有超级管理员可以进行//用户管理//普通用户//只能进行模块//内容//留言等管理
//       let a = User.findById(code._id).then(function(userInfo) {
//         code.isAdmin = true
//         code.isSuperAdmin = true
//         next()
//       })
//     } catch (e) {
//       // console.log('Cookies have some Error');
//       // next();
//     }
//   } else {
//     console.log('不存在用户cookie 数据！');
//     next()
//   }
// }
// app.use(main)

// 路由控制
// 根据不同功能划分模块
require('./config/initializer')
const routers = requireDir('./routers')
for (const prop in routers) {
  if (routers.hasOwnProperty(prop)) {
    app.use(routers[prop].routes(), routers[prop].allowedMethods())
  }
}

const server = http.createServer(app.callback())

const port = config.get('port')

server.listen(port, (err) => {
  if (err) {
    app.logger.error('error', '[sever error]', err)
  } else {
    // app.logger.info(`[${process.env.NODE_ENV || 'development'}] server listening port: ${port}`)
  }
})

module.exports = server
