function list(req, res, next) {
  // res.send('后台管理首页')
  res.render('admin/adminIndex', {
    userInfo: req.userInfo
  })
}