'use strict'

/**
 * Created by rockey on 2016/11/13.
 * reconstruction by rockey on 2018/3/6
 */


//用户路由
var express = require('express')
var userRouter = express.Router()
//

userRouter.get('/', function(req, res, next) {
  //加载用户博客首页
  res.render('user/userIndex', {})
})

module.exports = userRouter
