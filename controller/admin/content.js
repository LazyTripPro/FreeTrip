function list(req, res, next) {
  // res.render('admin/content_index',{})
  // 从数据库中读取所有分类数据
  let reqPage = Number((req.query.page) === undefined ? 0 : req.query.page)
  let page = reqPage <= 0 ? 1 : reqPage
  let limit = 2
  let pages = 0
  let skip = (page - 1) * limit
  //
  Content.count().then(function(count) {
    // console.log(count)
    //总页数
    pages = Math.ceil(count / limit)
    //
    Content.find().sort({
    addTime: -1
    }).limit(limit).skip(skip).populate('category').then(function(contents) {
    // console.log('分类首页回显数据' + contents)
    res.render('admin/content_index', {
      userInfo: req.userInfo,
      contents: contents,
      count: count,
      limit: limit,
      pages: pages,
      page: page
    })
    })
  })
}
function show(req, res, next) {
  //内容添加//下拉选择分类//从数据库取出分类数据
  Category.find().sort({
    _id: -1
  }).then(function(categories) {
    res.render('admin/content_add', {
      userInfo: req.userInfo,
      categories: categories
    })
  })
}
function create(req, res, next) {
  //
  let postData = req.body
  // console.log('添加内容传入的数据' + postData.category)
  // console.dir(postData.category)
  //字段检测等可放前端检测
  //前端检测 可对输入框等 进行响应交互等处理
  if (postData.category === '' || postData.title === '' || postData.content === '') {
    res.render('admin/error', {
      userInfo: req.userInfo,
      message: '有未填写的信息'
    })
    return
  } else {
    //数据写入到数据库
    let newContent = new Content({
      category: postData.category,
      user: req.userInfo._id.toString(),
      title: postData.title,
      description: postData.description,
      content: postData.content
    })
    // console.log(newContent)
    newContent.save().then(function(rs) {
      res.render('admin/success', {
        userInfo: req.userInfo,
        message: '内容数据保存成功',
        url: '/admin/content'
      })
    })
  }
}
function edit(req, res, next) {
  //
  let id = req.query.id || ''
  let resCategories = {}
  Category.find().sort({
    _id: -1
  }).then(function(categories) {
    resCategories = categories
    return Content.findOne({
      _id: id
    }).populate('category').then(function(content) {
      if (!content) {
        res.render('admin/error', {
          userInfo: req.userInfo,
          message: '内容信息不存在'
        })
        // Promise.reject(reason)方法返回一个用reason拒绝的Promise
        return Pramise.reject()
      } else {
        res.render('admin/content_edit', {
          userInfo: req.userInfo,
          categories: resCategories,
          content: content
        })
      }
    })
  })
}