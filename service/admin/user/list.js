const {User} = require('../../../models')
const AdminBaseService = require('../base')
const Joi = require('joi')

const jsonSchema = {
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
}

class ListService extends AdminBaseService {
  async perform () {
    this._paginateParams()
    const r = await User.paginate(this.options, this.paginate)
    this.body = r
  }

  get _jsonSchema () {
    return jsonSchema
  }
}

module.exports = ListService