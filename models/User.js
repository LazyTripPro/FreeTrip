const {Schema} = require('mongoose')
const bcrypt = require('bcrypt-as-promised')
const _ = require('lodash')

let schema = new Schema({
  phone: { type: String, index: true, comment: '手机号', required: true },
  email: { type: String, default: '', comment: '邮箱' },
  username: { type: String, default: '', comment: '用户名' },
  encryptedPassword: { type: String, default: '', comment: '加密密码' },
  channel: { type: String, default: '', comment: '合作渠道' },
  info: {
    location: { type: String, default: '', comment: '所在地区' },
    address: { type: String, default: '', comment: '详细地址' },
    travelCount: { type: String, default: '', comment: '每年出行次数' }
  },
  infoModules: [{ type: String, comment: '信息模块标识' }],
  loginTimes: { type: Number, default: 0, comment: '登陆次数' },
  registerIp: { type: String, default: '', comment: '注册IP' },
  currnetIp: { type: String, default: '', comment: '当前登陆IP' },
  lastIp: { type: String, default: '', comment: '最后登陆IP' },
  lastAt: { type: Date, default: null, comment: '最后登陆时间' },
  lockedAt: { type: Date, default: null, comment: '锁定时间' },
  lockReason: { type: String, default: '', comment: '锁定原因' }
}, {
  toJSON: {
    transform (doc, ret) {
      delete ret.encryptedPassword
    }
  }
})

schema.set('collection', 'users')

schema.virtual('password')
  .set(function setPassword (value) { this._password = value })
  .get(function getPassword () { return this._password })

schema.pre('save', async function preSave (next) {
  if (!this.password) return next()

  try {
    this.encryptedPassword = await bcrypt.hash(this.password)
    next()
  } catch (error) {
    next(error)
  }
})

schema.statics.payload = function (obj) {
  return _.pick(obj, [
    '_id',
    'createdAt',
    'phone',
    'email',
    'username',
    'info',
    'infoModules'
  ])
}

module.exports = schema
