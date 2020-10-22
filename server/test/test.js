process.env.NODE_ENV = 'test'

const db = require('../db')
const ticketsDao = require('../ticketsDao')
const serviceTypesDao = require('../serviceTypesDao')
const countersDao = require('../countersDao')

//delete all the tickets inserted
db.prepare("DELETE from tickets").run()
const nServiceTypes = db.prepare("SELECT count(*) as num from service_types").get().num
const nCounters = db.prepare("SELECT count(*) as num from counters").get().num


test('There are 3 service types defined', async () => {
    const obj = await serviceTypesDao.getServiceTypes()
    expect(obj.length).toBe(nServiceTypes)
})

test('All the single requests to service types should have the id specified as parameter', async () => {
    for (let i = 1; i <= nServiceTypes; i++) {
        const obj = await serviceTypesDao.getServiceType(i)
        expect(obj[0].id).toBe(i)
    }
})

test('There are 5 counters defined', async () => {
    const obj = await countersDao.getCounters()
    expect(obj.length).toBe(nCounters)
})

test('All the single requests to counters should have the id specified as parameter', async () => {
    for (let i = 1; i <= nCounters; i++) {
        const obj = await countersDao.getCounter(i)
        expect(obj.counterId).toBe(i)
    }
})

test('Queue associated to service type 1 is of length 1', async () => {
    const serviceTypeId = 1
    const obj = await ticketsDao.getQueue(serviceTypeId)
    expect(obj.serviceTypeId).toBe(serviceTypeId)
    expect(obj.queueLength).toBe(0)
})