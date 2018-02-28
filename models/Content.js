/**
 * Created by rockey on 2018/2/13.
 */

/*
 *   内容相关数据模型
 *
 * */

var mongoose = require('mongoose');
var contentSchema = require('../schemas/contents');
var db = mongoose.createConnection('mongodb://localhost:27017/myBlog');

module.exports = db.model('Content', contentSchema);