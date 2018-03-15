module.exports.list = async (ctx) => {
  const opts = ctx.query
  ctx.body = await ctx.render('user/userIndex', {})  
}
