const {Schema} = require('mongoose')
const _ = require('lodash')

let schema = new Schema({
  userId: { type: String, require: true, index: true, default: '', comment: '用户ID' },
  status: { type: String, require: true, index: true, default: '', comment: '订单状态' },
  amount: { type: String, require: true, index: true, default: '', comment: '消费金额' },
  tradeNo: { type: String, default: '', comment: '支付订单ID' },
  equipment: {
    os: { type: String, default: '', comment: '操作系统' },
    osVersion: { type: String, default: '', comment: '系统版本' },
    brand: { type: String, default: '', comment: '机器品牌' },
    version: { type: String, default: '', comment: '机器型号' }
  },
  userInfo: {
    name: { type: String, default: '', comment: '用户实名' },
    phone: { type: String, default: '', comment: '注册手机号' },
    bankPhone: { type: String, default: '', comment: '银行预留手机号' },
    idCardNo: { type: String, default: '', comment: '证件号' },
    bankName: { type: String, default: '', comment: '银行名称' },
    bankCardNo: { type: String, default: '', comment: '银行卡号' }
  },
  travelInfo: {
    startPoint: { type: String, default: '', comment: '出发地点' },
    target: { type: String, default: '', comment: '目的地' },
    startAt: { type: String, default: '', comment: '出发日期' },
    backAt: { type: String, default: '', comment: '返回日期' },
    travelType: { type: String, default: '', comment: '出行类型' }
  }
}, {
  toJSON: {
    transform (doc, ret) {
    }
  }
})

schema.set('collection', 'loans')

schema.statics.payload = function (obj) {
  return _.pick(obj, [
    'createdAt',
    '_id',
    'userId',
    'status',
    'amount'
  ])
}

module.exports = schema
