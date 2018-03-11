function list(req, res, next) {
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
  let reqPage = Number((req.query.page) === undefined ? 0 : req.query.page)
  // console.log(reqPage)
  let page = reqPage <= 0 ? 1 : reqPage
  let limit = 2
  let pages = 0
  let skip = (page - 1) * limit
  //
  User.count().then(function(count) {
    // console.log(count)
    //总页数
    pages = Math.ceil(count / limit)
    //
    User.find().sort({
    _id: -1
    }).limit(limit).skip(skip).then(function(users) {
    // console.log(users)
    res.render('admin/user_index', {
      userInfo: req.userInfo,
      users: users,
      count: count,
      limit: limit,
      pages: pages,
      page: page
    })
    })
  })
}