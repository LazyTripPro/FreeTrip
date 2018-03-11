function list(req, res, next) {
  // 从数据库中读取所有分类数据
  let reqPage = Number((req.query.page) === undefined ? 0 : req.query.page)
  let page = reqPage <= 0 ? 1 : reqPage
  let limit = 2
  let pages = 0
  let skip = (page - 1) * limit
  //
  Category.count().then(function(count) {
  // console.log(count)
  //总页数
    pages = Math.ceil(count / limit)
  //
    Category.find().sort({
    _id: -1
    }).limit(limit).skip(skip).then(function(categories) {
  // console.log('分类首页回显数据  ' + categories)
      res.render('admin/category_index', {
        userInfo: req.userInfo,
        categories: categories,
        count: count,
        limit: limit,
        pages: pages,
        page: page
      })
    })
  })
}
function show(req, res, next) {
  res.render('admin/category_add', {
    userInfo: req.userInfo
  })
}
function update(req, res, next) {
    // console.log(req.body)
  let name = req.body.name || ''
  if (name === '') {
    res.render('admin/error', {
    userInfo: req.userInfo,
    message: '名称不能为空',
    url: ''
    })
  } else {
    //名称部位空//验证数据库只能怪是否存在
    Category.findOne({
    name: name
    }).then(function(resData) {
      if (resData) {
        //数据库中已经存在
        res.render('admin/error', {
        userInfo: req.userInfo,
        message: '分类已经存在'
        })
      } else {
        //不存在则写入数据
        return new Category({
        name: name
        }).save()
      }
    }).then(function(newCategory) {
    //返回新的分类数据
      res.render('admin/success', {
        userInfo: req.userInfo,
        message: '分类保存成功',
        url: '/admin/category',
        categories: newCategory
      })
    })
  }
}
function create(req, res) {
    //获取要修改的数据//以表单形式展现出来
  let id = req.query.id || ''
  Category.findOne({
    _id: id
  }).then(function(category) {
    if (!category) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '分类信息不存在'
      })
        // Promise.reject(reason)方法返回一个用reason拒绝的Promise
      return Pramise.reject()
    } else {
      res.render('admin/category_edit', {
        userInfo: req.userInfo,
        category: category
      })
    }
  })
}
function edit(req, res) {
  //获取要修改的分类信息
  let id = req.query.id || ''
  //获取Post提交过来的 修改的名称
  let newName = req.body.name || ''
  //判断数据库是否已有
  Category.findOne({
    _id: id
  }).then(function(category) {
    if (!category) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '分类信息不存在'
      })
      return Pramise.reject()
    } else {
      // 当用户没有做任何修改提交时候 判断处理【可放在前端判断】
      if (newName === category.name) {
        res.render('admin/error', {
          userInfo: req.userInfo,
          message: '修改成功',
          url: '/admin/category'
        })
      } else {
        //要修改的分类名称是否在数据库中已存在
        return Category.findOne({
          _id: {
            $ne: id
          },
          name: newName
        })
      }
    }
  }).then(function(sameCategory) {
    if (sameCategory) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '数据库中已经存在同名分类',
      })
      return Pramise.reject()
    } else {
      return Category.update({
        //条件-当前ID
        _id: id
      }, {
        //修改的内容- 更新的名称
        name: newName
      })
    }
  }).then(function() {
    res.render('admin/success', {
      userInfo: req.userInfo,
      message: '修改成功',
      url: '/admin/category'
    })
  })
}
function save(req, res, next) {
  //
  let id = req.query.id || ''
  let postData = req.body
  // console.log('添加内容传入的数据' + postData.category)
  //字段检测等可放前端检测
  //前端检测 可对输入框等 进行响应交互等处理
  if (postData.category === '' || postData.title === '' || postData.content === '') {
    res.render('admin/error', {
      userInfo: req.userInfo,
      message: '有未填写的信息'
    })
    return
  } else {
    //保存数据到数据库
    Content.update({
      //条件
      _id: id
    }, {
      //更新的数据字段
      category: postData.category,
      title: postData.title,
      description: postData.description,
      content: postData.content
    }).then(function() {
      res.render('admin/success', {
        userInfo: req.userInfo,
        message: '内容数据修改成功',
        //保存成功可跳转到指定Url页面 eg:内容展示详情页面
        // url: '/admin/content/edit?id=' + id
        url: '/admin/content'
      })
    })
  }
}
function deleted(req, res, next) {
  let id = req.query.id || ''
  Content.remove({
    //删除的条件
    _id: id
  }).then(function() {
    res.render('admin/success', {
      userInfo: req.userInfo,
      message: '删除成功',
      url: '/admin/content'
    })
  })
}
