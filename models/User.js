/**
 * Created by rockey on 2018/2/13.
 */


var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

/*
 *   User
 *
 **/

module.exports = mongoose.model('User', userSchema);