'use strict';

const config = require('config')
const sqlite = require('better-sqlite3')

console.log("Using " + config.DBSOURCE)
const db = new sqlite(config.DBSOURCE, { verbose: console.log })

module.exports = db
