'use strict';

const sqlite = require('better-sqlite3')

const DBSOURCE = './db/database.db';

const db = new sqlite(DBSOURCE, { verbose: console.log });

module.exports = db;
