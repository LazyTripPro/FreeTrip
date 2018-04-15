const {Schema} = require('mongoose')

let schema = new Schema({
  businessName: { type: String, required: true, index: true, comment: '商家信息' },
  type: { type: String, default: '', comment: '类别(省内，国内，国外)' },
  location: { type: Array, default: '', comment: '出行的各个地点' },
  tripMode: { type: Array, default: null, comment: '出行方式' },
  amount: { type: String, default: null, comment: '总费用' },
  hotelLocation: { type: Array, default: null, comment: '住宿地点' },
  tripDay: { type: String, default: null, comment: '旅行时间' },
  meal: { type: String, default: null, comment: '用餐情况' },
  leader: { type: String, default: null, comment: '导游介绍' },
  detail: { type: String, default: null, comment: '旅行项目详细介绍' },
  leaderId: { type: String, default: null, comment: '导游Id' }
}, {
  toJSON: {
    transform (doc, ret) {
      delete ret.encryptedPassword
    }
  }
})

schema.set('collection', 'travelLogs')

module.exports = schema
