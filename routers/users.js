const router = require('koa-router')({
  prefix: '/user'
})
const users = require('../controller/user/users')

/**
 * modify by rockey on 2018/3/14.
 */

router.get('/', users.list)

module.exports = router
