'use strict';

const db = require('./db');

exports.getServiceTypes = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, name, sign FROM service_types";
        const stmt = db.prepare(sql)
        resolve(stmt.all())
    })
}
