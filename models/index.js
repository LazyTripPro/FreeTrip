'use strict'

const db = require('../config/initializer/').dbs.get('db')
const mongoosePaginate = require('mongoose-paginate')

function staticMethodHelper (schema) {
  schema.statics.upsert = function (query, update, opts = upsertOpts) {
    return this.findOneAndUpdate(query, update, opts)
  }

  schema.statics.updateOne = function (query, update) {
    return this.findOneAndUpdate(query, update, {new: true})
  }

  return schema
}

function set (schema) {
  schema.set('timestamps', true)
  schema.set('minimize', false)
  schema.set('strict', true)
  schema.set('id', true)
  schema.set('_id', true)
  schema.set('toObject', {getters: true, virtuals: true, minimize: false, id: true})
  schema.set('toJSON', {getters: true, virtuals: true, minimize: false, id: true})
  schema.plugin(mongoosePaginate)
  return staticMethodHelper(schema)
}

module.exports.Content = db.model('Content', set(require('./Content')))
module.exports.User = db.model('User', set(require('./User')))
module.exports.Category = db.model('Category', set(require('./Category')))
