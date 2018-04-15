const {Schema} = require('mongoose')

let schema = new Schema({
  name: { type: String, required: true, index: true, comment: '导游名称' },
  type: { type: String, default: '', comment: '类别(旅行社导游，当地导游，兼职导游)' },
  location: { type: Array, default: '', comment: '出行的各个地点' },
  amount: { type: String, default: null, comment: '总费用' },
  detail: { type: String, default: null, comment: '导游详细介绍' },
  leaderId: { type: String, default: null, comment: '导游id' },
  tripId: { type: String, default: null, comment: '旅行社id' },
  loanId: { type: String, default: null, comment: '订单id' }
}, {
  toJSON: {
    transform (doc, ret) {
      delete ret.encryptedPassword
    }
  }
})

schema.set('collection', 'leaders')

module.exports = schema
