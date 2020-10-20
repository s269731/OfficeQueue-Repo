'use strict';

const db = require('./db')



function computeWaitingTime(serviceTypeId) {
    console.log("serviceTypeId passed as parameter to computeWaitingTime: "+serviceTypeId)
    const sql ="SELECT counter_id FROM counters_service_types WHERE service_type_id=?" //get counterIDs that performs that service type
    //let arrayCounterIDservices
    let DifferentServicesSum=0
    const stmt = db.prepare(sql)
    const counterIdArray = stmt.all([serviceTypeId])
    counterIdArray.forEach(element=>{
        const sql ="SELECT COUNT(*) as value FROM counters_service_types WHERE counter_id=?"
        const stmt=db.prepare(sql)
        const res = stmt.get([element.counter_id])
        DifferentServicesSum=DifferentServicesSum+1/(res.value)
    })

    const nPeopleInQueue = getPeopleNumberInQueue(serviceTypeId)
    const sql1="SELECT service_time FROM service_types WHERE id=?"
    const stmt1 = db.prepare(sql1)
    let serviceTime = stmt1.get([serviceTypeId])

    return serviceTime.service_time *(nPeopleInQueue/DifferentServicesSum+1/2)
}


function getPeopleNumberInQueue(serviceTypeId){
        console.log("serviceTypeId passed as parameter to getPeopleNumberInQueue: "+serviceTypeId)
        const sql="SELECT COUNT(*) as value FROM tickets WHERE counter_id IS NULL AND service_type_id=?"
        const stmt = db.prepare(sql)
        const res = stmt.get([serviceTypeId])
        console.log("res.value in getPeopleNumberInQueue:"+res.value)
        return res.value

}

exports.addTicket = function(serviceTypeId) {
    console.log("serviceTypeId passed as parameter to addTicket: "+serviceTypeId)
    return new Promise((resolve, reject) => {
        const waitingTime = computeWaitingTime(serviceTypeId)

        const sql = "INSERT INTO tickets(service_type_id, waiting_time) VALUES(?, ?)"
        const stmt = db.prepare(sql)
        const res = stmt.run([serviceTypeId, waitingTime])
        //const res = stmt.run([serviceTypeId, 5])
        resolve({"ticketId":res.lastInsertRowid, "serviceTypeId":serviceTypeId, "waitingTime":waitingTime})
        //resolve({"ticketId":res.lastInsertRowid, "serviceTypeId":serviceTypeId, "waitingTime":5})

    })
}
