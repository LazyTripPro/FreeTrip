/**
 * Created by rockey on 2018/2/3.
 */

const {Schema} = require('mongoose')

//分类表结构
let schema = new Schema({
    //分类名称
    name: {type: String}
});

module.exports = schema;


/*
 此处也可以直接
 module.exports = mongoose.model('User',userSchema);
 */