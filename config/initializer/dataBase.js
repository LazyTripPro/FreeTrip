'use strict'

const mongoose = require('mongoose')
const config = require('config')
mongoose.Promise = require('bluebird')
// todo: 需搞清楚config的数据源从哪里来
const configs = config.get('database.mongodb')
let dbs = new Map()

function createConnection (url, options = {}) {
  const db = mongoose.createConnection(url, options)

  db.on('error', err => {
    err.message = `[mongoose]${err.message}`
    console.error(err)
  })

  db.on('disconnected', () => {
    console.error(`[mongoose] ${url} disconnected`)
  })

  db.on('connected', () => {
    console.info(`[mongoose] ${url} connected successfully`)
  })

  db.on('reconnected', () => {
    console.info(`[mongoose] ${url} reconnected successfully`)
  })

  return db
}

for (let c of configs) {
  dbs.set(c.name, createConnection(c.url, c.options))
}

module.exports = dbs
