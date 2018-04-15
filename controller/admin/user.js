const ListService = require('../../service/admin/user/list')
module.exports.list = async (ctx) => {
  const opts = ctx.query
  let s = new ListService(opts, ctx)
  await s.perform()
  let code = ctx.cookies.get('userInfo')
  if (!code) {
    ctx.cookies.set('userInfo',{})
    code = ctx.cookies.get('userInfo')
  }
  // code = JSON.parse(code)
  ctx.body = await ctx.render('admin/user_index', code)
}