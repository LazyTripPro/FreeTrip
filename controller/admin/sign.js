function out(req, res) {
  req.cookies.set('userInfo', null)
  res.render('main/mainIndex', {})
}