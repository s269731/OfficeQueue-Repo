'use strict';

const db = require('./db');

exports.getCounters = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, name FROM counters"
        const stmt = db.prepare(sql)
        resolve(stmt.all())
    })
}

exports.getCounter = function(id) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT DISTINCT s.id, s.name FROM counters c, service_types s, counters_service_types cs WHERE cs.counter_id = ? and s.id = cs.service_type_id";
        const serviceTypes = db.prepare(sql).all(id)
        sql = "SELECT * FROM counters WHERE id = ?"
        const counter = db.prepare(sql).get(id)
        sql = "SELECT id FROM tickets WHERE counter_id = ?"
        const ticket = db.prepare(sql).get(id)
        resolve({'counterId':counter.id, 'counterName':counter.name, 'currentTicketId':ticket, 'serviceTypes':serviceTypes})
    })
}

exports.getNewTicketToServe = function(counterId) {
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM tickets WHERE counter_id = ?"
        db.prepare(sql).run(counterId)
        
        sql = "select t.id, t.service_type_id, s.service_time, count(*) as tot from tickets t, service_types s \
            where t.counter_id is null and t.service_type_id = s.id and t.service_type_id in ( \
                    SELECT DISTINCT s.id FROM counters c, service_types s, counters_service_types cs \
                    WHERE cs.counter_id = ? and s.id = cs.service_type_id \
            ) group by t.service_type_id order by count(*) desc, service_time asc"
        const rows = db.prepare(sql).all(counterId)[0]
        
        if(!rows)
            reject("No tickets to serve from this counter")
        
        sql = "UPDATE tickets SET counter_id = ? WHERE id = ?"
        db.prepare(sql).run([counterId, rows.id])
        
        resolve({"ticketId": rows.id, "serviceTypeId": rows.service_type_id})
    })
}
