const Joi = require('joi')
const ERROR = require('../../lib/middleware/error')
const jsonSchema = {}

function removeEmpty (opts) {
  Object.keys(opts).forEach(function (key) {
    if (opts[key] && typeof opts[key] === 'object') {
      removeEmpty(opts[key])
    } else if (opts[key] === undefined) {
      delete opts[key]
    }
  })

  return opts
}
function wr(data, code) {
  return {
    code: code || 0,
    data: data
  }
}

class BaseService {
  constructor (options = {}, ctx, ignore = false) {
    this.options = removeEmpty(options)
    this.ctx = ctx
    if (!ignore) this._validOptions()
  }

  async perform () {
    // 实现逻辑
  }

  warnError (msg, code) {
    throw new ERROR.WarnError(msg, code)
  }

  get result () {
    return wr(this.body, this.code)
  }

  get logger () {
    return this.ctx.logger
  }

  log (opts) {
    this.ctx.log(opts)
  }

  delOptsByKey (key) {
    let value
    if (key in this.options) {
      value = this.options[key]
      delete this.options[key]
    }

    return value
  }

  _paginateParams () {
    this.paginate = {}
    if (!this.options.page) {
      this.paginate.page = 1
    } else {
      this.paginate.page = parseInt(this.options.page)
      delete this.options.page
    }

    if (!this.options.limit) {
      this.paginate.limit = 10
    } else {
      this.paginate.limit = parseInt(this.options.limit)
      delete this.options.limit
    }

    this.paginate.sort = {_id: -1}
  }

  get _jsonSchema () {
    return jsonSchema
  }

  _validOptions () {
    const { error, value } = Joi.validate(this.options, this._jsonSchema)

    if (error) {
      this.log(error)
      // this.warnError(ERROR.ErrorConstant.PARAMS_ERROR, 40013)
      this.warnError(error.details[0].message, 40013)
    }

    this.options = value
  }
}

module.exports = BaseService
