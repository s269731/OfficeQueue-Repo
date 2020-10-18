'use strict';

const db = require('./db');

exports.getCounters = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, name FROM counters";
        const stmt = db.prepare(sql)
        resolve(stmt.all())
    })
}

exports.getCounter = function(id) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT DISTINCT s.id, s.name FROM counters c, service_types s, counters_service_types cs WHERE cs.counter_id = ? and s.id = cs.service_type_id";
        const service_types = db.prepare(sql).all(id)
        sql = "SELECT * FROM counters WHERE id = ?";
        const counter = db.prepare(sql).get(id)
        sql = "SELECT id FROM tickets WHERE counter_id = ?";
        const ticket = db.prepare(sql).get(id)
        resolve({'counter':counter, 'current_ticket':ticket, 'service_types':service_types})
    })
}
