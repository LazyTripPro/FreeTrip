const Redis = require('ioredis')
const config = require('config')
const REDIS_OPTS = config.get('redis')

const redis = new Redis(REDIS_OPTS)

redis.on('error', (err) => {
  console.error('redis error:', err)
})

redis.once('connect', () => {
  console.log(`redis connected: redis://${REDIS_OPTS.host}:${REDIS_OPTS.port}`)
})

redis.once('reconnecting', () => {
  console.error('redis Reconnecting')
})

module.exports = redis
