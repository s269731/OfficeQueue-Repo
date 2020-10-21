process.env.NODE_ENV = 'test'

const ticketsDao = require('../ticketsDao')

var assert = require('assert')

describe('ticketsDao', function() {
  describe('#getQueue(serviceTypeId)', function() {
    it('Queue associated to service type 1 is of length 1', async () => {
        const serviceTypeId = 1
        const obj = await ticketsDao.getQueue(serviceTypeId)
        assert.equal(obj.serviceTypeId, serviceTypeId)
        assert.equal(obj.queueLength, 1)
    })
  })
})
