const ListService = require('../../service/admin/user/list')
  // 从数据库中读取所有用户数据
  /*
   *   sort() 可对字段指定排序 传值 -1降序 1 升序
   *   对数据进行分页
   *   limit(number) 限制从数据库中取出条数
   *   skip(number) 忽略数据的条数
   *
   *   eg:每页显示2条
   *   第一页：1-2 skip 0  -> 当前页 -1 * limit
   *   第二页：3-4 skip 2 ->
   *   ...
   *
   * */
  // let page = 1
  // console.log(req.query.page)
module.exports.list = async (ctx) => {
  const opts = ctx.query
  let s = new ListService(opts, ctx)
  await s.perform()
  ctx.render('admin/user_index.html', {users: s.result.data})  
}
// function list(req, res, next) {


// }