// todo: 搞清楚config里面的配置文件是如何和项目关联
module.exports = { 
  port: process.env.PORT || 8888,
  database: {
    mongodb: [
        {
        name: 'db',
        url: process.env.MONGO_URL || 'mongodb://localhost/myblog',
        options: {}
        }
    ]
  },
  redis: {
    host: process.env.REDIS_URL || '127.0.0.1',
    port: 6379,
    keyPrefix: 'el',
    db: 0
  }
}
