/**
 * Created by rockey on 2018 / 2 / 13.
 */

var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');
var db = mongoose.createConnection('mongodb://localhost:27017/myBlog');

module.exports = db.model('Category',categoriesSchema);