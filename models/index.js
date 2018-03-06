'use strict'

const db = require('../config/initializer/dataBase').dbs.get('db')

module.exports.Admin = db.model('Content', set(require('./Content')))
module.exports.User = db.model('User', set(require('./User')))
module.exports.Account = db.model('Category', set(require('./Category')))
