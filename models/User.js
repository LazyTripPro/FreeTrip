/**
 * Created by rockey on 2018/2/13.
 */


var mongoose = require('mongoose');
var userSchema = require('../schemas/users');
var db = mongoose.createConnection('mongodb://localhost:27017/myBlog');

/*
 *   User
 *
 **/

module.exports = db.model('User', userSchema);