'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var allow = require('./middlewares/allow').allow;
var app = express();

var user_routes = require('./routes/user'); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(allow);

app.use('/api', user_routes);

module.exports = app;