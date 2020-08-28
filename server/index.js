const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const apiDocs = require('./swagger.json');

const app = express();
app.use(cors())

const { getStores, getStore, getCategories, getZones } = require('./resolvers');

const PORT = process.env.PORT || 5000;

app.get('/api/getCategoriesList', (req, res) => {
    let result = null;     
    result = getCategories()
    return res.status(200).send(result);
});
app.get('/api/getZonesList', (req, res) => {
    let result = null;     
    result = getZones()
    return res.status(200).send(result);
});

app.get('/api/getStoresList', (req, res) => {
    const params = Object.keys(req.query);
    let result = null; 
    if(!params.length) {
        result = getStores()
    } else {
        result = params.length === 1 ? 
            getStores(req.query[params[0]]) :
            getStores(req.query[params[0]], req.query[params[1]]);
    }
    return res.status(200).send(result);
});
app.get('/api/getStore', (req, res) => {
    const params = Object.keys(req.query);
    if(!params.length) {
        return res.status(404).send()
    }
    return res.status(200).send(getStore(req.query[params[0]]));
});
app.get('/', (req, res) => res.sendFile(path.resolve(`desktop/index.html`)));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
app.get('/*', (req, res) => res.sendFile(path.resolve(`desktop/${req.path}`)));

app.listen(PORT);