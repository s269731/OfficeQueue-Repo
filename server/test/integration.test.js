process.env.NODE_ENV = 'test'

const db = require('../db')
const ticketsDao = require('../ticketsDao')
const serviceTypesDao = require('../serviceTypesDao')
const countersDao = require('../countersDao')

//delete all the tickets inserted
db.prepare("DELETE from tickets").run()
const nServiceTypes = db.prepare("SELECT count(*) as num from service_types").get().num
const nCounters = db.prepare("SELECT count(*) as num from counters").get().num

const numTicketsToAdd = [7, 5, 10]

test('add some tickets to queues and check they were added correctly', async () => {
    for(let serviceTypeId=1; serviceTypeId <= nServiceTypes; serviceTypeId++) {
        for(let i=0; i < numTicketsToAdd[serviceTypeId-1]; i++) {
            const obj = await ticketsDao.addTicket(serviceTypeId)
            expect(obj.ticketNumber).toBe(i+1)
        }
    }
})

test('number of tickets added should be returned correctly by getQueue', async () => {
    for(let serviceTypeId=1; serviceTypeId <= nServiceTypes; serviceTypeId++) {
        const obj = await ticketsDao.getQueue(serviceTypeId)
        expect(obj.serviceTypeId).toBe(serviceTypeId)
        expect(obj.queueLength).toBe(numTicketsToAdd[serviceTypeId-1])
    }
})

test('the next served ticket should be picked from the biggest queue', async () => {
    //only test for first counter that supports all service types
    const counterId = 1
    let obj = await countersDao.getNewTicketToServe(counterId)
    expect(obj.ticketNumber).toBe(1)
    expect(obj.serviceTypeId).toBe(3)
    obj = await countersDao.getNewTicketToServe(counterId)
    expect(obj.ticketNumber).toBe(2)
    expect(obj.serviceTypeId).toBe(3)
    obj = await countersDao.getNewTicketToServe(counterId)
    expect(obj.ticketNumber).toBe(3)
    expect(obj.serviceTypeId).toBe(3)
    //here queue 1 and 3 are both length 7, pick ticket from the one
    //with the lowest service time (the first one)
    obj = await countersDao.getNewTicketToServe(counterId)
    expect(obj.ticketNumber).toBe(1)
    expect(obj.serviceTypeId).toBe(1)
    obj = await countersDao.getNewTicketToServe(counterId)
    expect(obj.ticketNumber).toBe(4)
    expect(obj.serviceTypeId).toBe(3)
    obj = await countersDao.getNewTicketToServe(counterId)
    expect(obj.ticketNumber).toBe(2)
    expect(obj.serviceTypeId).toBe(1)
    obj = await countersDao.getNewTicketToServe(counterId)
    expect(obj.ticketNumber).toBe(5)
    expect(obj.serviceTypeId).toBe(3)
    //now all are 5, pick again the lowest (the second)
    obj = await countersDao.getNewTicketToServe(counterId)
    expect(obj.ticketNumber).toBe(1)
    expect(obj.serviceTypeId).toBe(2)
})
