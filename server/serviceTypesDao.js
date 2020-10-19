'use strict';

const db = require('./db');

exports.getServiceTypes = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, name, sign, service_time FROM service_types";
        const stmt = db.prepare(sql)
        resolve(stmt.all())
    })
}

exports.getServiceType = function(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM service_types WHERE id = ?";
        const stmt = db.prepare(sql)
        const row = stmt.all(id)
        if (row.length === 0)
            resolve(undefined);
        else
            resolve(row)
    })
}
