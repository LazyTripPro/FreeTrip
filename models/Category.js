'use strict'

/**
 * Created by rockey on 2018 / 3 / 6.
 */
const {Schema} = require('mongoose')

//分类表结构
let schema = new Schema({
    //分类名称
  name: {type: String}
});

module.exports = schema;
