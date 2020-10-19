'use strict';

const db = require('./db')


function computeWaitingTime(serviceTypeId) {
    //TODO
    return Math.floor(Math.random() * 30)
}

exports.addTicket = function(serviceTypeId) {
    return new Promise((resolve, reject) => {
        const waitingTime = computeWaitingTime(serviceTypeId)
        
        serviceTypeId = Math.floor(Math.random() * 3) + 1
        
        const sql = "INSERT INTO tickets(service_type_id, waiting_time) VALUES(?, ?)"
        const stmt = db.prepare(sql)
        const res = stmt.run([serviceTypeId, waitingTime])
        resolve({serviceTypeId:serviceTypeId, waitingTime:waitingTime})
    })
}
