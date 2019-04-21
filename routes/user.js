'use strict'

var express = require('express');

var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/user/', md_auth.ensureAuth, UserController.findAll);

module.exports = api;