'use strict';

const db = require('./db')



function computeWaitingTime(serviceTypeId) {
    console.log("serviceTypeId passed as parameter to computeWaitingTime: "+serviceTypeId)
    const sql ="SELECT counter_id FROM counters_service_types WHERE service_type_id=?" //get counterIDs that performs that service type
    //let arrayCounterIDservices
    let DifferentServicesSum=0
    const stmt = db.prepare(sql)
    const counterIdArray = stmt.all([serviceTypeId])
    if(counterIdArray.length>0) {
        counterIdArray.forEach(element => {
            const sql = "SELECT COUNT(*) as value FROM counters_service_types WHERE counter_id=?"
            const stmt = db.prepare(sql)
            const res = stmt.get([element.counter_id])
            DifferentServicesSum = DifferentServicesSum + 1 / (res.value)
        })

        const nPeopleInQueue = getPeopleNumberInQueue(serviceTypeId)
        if(nPeopleInQueue===-1){
            return -2
        }
        else {
            const sql1 = "SELECT service_time FROM service_types WHERE id=?"
            const stmt1 = db.prepare(sql1)
            let serviceTime = stmt1.get([serviceTypeId])
            return serviceTime.service_time * (nPeopleInQueue / DifferentServicesSum + 1 / 2)
        }
    }
    else{
        //counterIdArray is empty, there aren't counter that serve serviceTypeId
        return -1

    }
}


function getPeopleNumberInQueue(serviceTypeId){
        console.log("serviceTypeId passed as parameter to getPeopleNumberInQueue: "+serviceTypeId)
        const sql="SELECT COUNT(*) as value FROM tickets WHERE counter_id IS NULL AND service_type_id=?"
        const stmt = db.prepare(sql)
        const res = stmt.get([serviceTypeId])
        if(res!==undefined)
            return res.value
        else
            return -1

}

exports.addTicket = function(serviceTypeId) {
    console.log("serviceTypeId passed as parameter to addTicket: "+serviceTypeId)
    return new Promise((resolve, reject) => {
        const waitingTime = computeWaitingTime(serviceTypeId)

        if(waitingTime===-1){
            reject("There aren't counters that could serve requested service")
        }
        else if(waitingTime===-2){
            reject("There was an issue computing number of ticket of the same type that should be served")
        }
        else {
            const row = db.prepare("select max(ticket_number) as tnum from tickets where service_type_id = ?").get(serviceTypeId)
            const ticketNumber = row.tnum + 1
            const sql = "INSERT INTO tickets(service_type_id, waiting_time, ticket_number) VALUES(?, ?, ?)"
            const stmt = db.prepare(sql)
            const res = stmt.run([serviceTypeId, waitingTime, ticketNumber])
            if(res===undefined)
                reject("There was an issue retrieving the ticket")
            else
                resolve({"ticketId": res.lastInsertRowid, "ticketNumber":ticketNumber, "serviceTypeId": serviceTypeId, "waitingTime": waitingTime})

        }

    })
}
