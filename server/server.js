const express = require('express');
const serviceTypesDao = require('./serviceTypesDao');
const countersDao = require('./countersDao');

const PORT = 3001;
const app = express();

app.use(express.json());

app.get('/api/service_types', (req, res) => {
    serviceTypesDao.getServiceTypes()
        .then((service_types) => {
            res.json(service_types)
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             })
       })
})

app.get('/api/service_types/:id', (req, res) => {
    serviceTypesDao.getServiceType(req.params.id)
        .then((service_types) => {
            res.json(service_types)
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             })
       })
})

app.get('/api/counters', (req, res) => {
    countersDao.getCounters()
        .then((counters) => {
            res.json(counters)
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             })
       })
})

app.get('/api/counters/:id', (req, res) => {
    countersDao.getCounter(req.params.id)
        .then((counters) => {
            res.json(counters)
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             })
       })
})

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
