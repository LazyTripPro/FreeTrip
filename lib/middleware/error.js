class WarnError extends Error {
  constructor (msg, code) {
    super(msg)
    this.msg = msg
    this.code = code || -1
  }

  get body () {
    return {
      data: this.msg,
      code: this.code
    }
  }
}

class ParamsError extends WarnError {
  constructor (msg, code) {
    code = code || 40013
    super(msg, code)
  }
}

const errorHandler = async (ctx, next) => {
  try {
    await next()
    if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
  } catch (err) {
    try {
      ctx.app.emit('error', err, ctx)
    } catch (logErr) {
      ctx.log(err)
      ctx.log(logErr)
    }

    if (ctx.type === 'text/html') {
      if (err instanceof WarnError) {
        const msg = err.msg
        await ctx.render('error/error', {msg})
      } else if (ctx.status === 404) {
        await ctx.render('error/404')
      } else {
        await ctx.render('error/502')
      }
    } else {
      let body
      if (err instanceof WarnError) {
        body = err.body
      } else {
        ctx.status = err.status || 503
        body = {
          code: ctx.status,
          data: isDev() ? err.message : '服务器出小差'
        }
      }

      ctx.body = body
    }
  }
}

function isDev () {
  return (process.NODE_ENV === 'development' || process.NODE_ENV === 'test')
}

const ErrorConstant = {
  LOGIN_OR_PASSWORD_ERROR: '账号或密码错误',
  PARAMS_ERROR: '参数错误',
  VERIFY_CODE_ERROR: '验证码错误',
  NOT_YET_REGISTER: '账号还没注册',
  PHONE_REGISTER: '手机号已被注册',
  PHONE_OR_EMAIL_REGISTER: '手机号或者邮箱已被注册'
}

module.exports = {
  WarnError: WarnError,
  ParamsError: ParamsError,
  ErrorConstant: ErrorConstant,
  errorHandler: errorHandler
}
