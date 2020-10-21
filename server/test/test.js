process.env.NODE_ENV = 'test'

const ticketsDao = require('../ticketsDao')

test('Queue associated to service type 1 is of length 1', async () => {
    const serviceTypeId = 1
    const obj = await ticketsDao.getQueue(serviceTypeId)
    expect(obj.serviceTypeId).toBe(serviceTypeId)
    expect(obj.queueLength).toBe(1)
});
