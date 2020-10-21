'use strict';

const config = require('config')
const sqlite = require('better-sqlite3')

if(config.verbose)
    console.log("Using " + config.DBSOURCE)
const db = new sqlite(config.DBSOURCE, config.verbose ? { verbose: console.log } : null)

module.exports = db
