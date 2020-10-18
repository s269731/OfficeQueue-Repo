const express = require('express');
const serviceTypesDao = require('./serviceTypesDao');

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

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
