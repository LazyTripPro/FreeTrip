const {Schema} = require('mongoose')
const bcrypt = require('bcrypt-as-promised')

let schema = new Schema({
  email: { type: String, required: true, index: true, comment: '邮箱' },
  phone: { type: String, required: true, index: true, comment: '手机号' },
  username: { type: String, required: true, comment: '用户名' },
  encryptedPassword: { type: String, comment: '加密密码' },
  role: { type: String, default: '', comment: '管理员角色' },
  audited: { type: Boolean, default: false, comment: '是否审核' },
  super: { type: Boolean, default: false, comment: '超级管理' },
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

schema.set('collection', 'admins')

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

module.exports = schema
