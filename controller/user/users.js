module.exports.list = async (ctx) => {
  const opts = ctx.query
  await ctx.render('user/userIndex', {})  
}
