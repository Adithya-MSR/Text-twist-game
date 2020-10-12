const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productCtrl = require('./controller/productController');

var PORT = process.env.PORT || 3001
const baseUrl = '/backend';
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.route(baseUrl)
    .get(productCtrl.randomAlpha)

let server = app.listen(PORT, function () {  
    console.log(`Product Service is running`);
})