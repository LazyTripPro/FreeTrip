// todo: 搞清楚config里面的配置文件是如何和项目关联
module.exports = { 
  database: {
    mongodb: [
        {
        name: 'db',
        url: process.env.MONGO_URL || 'mongodb://localhost/enterprise-dev',
        options: {}
        }
    ]
  }
}
