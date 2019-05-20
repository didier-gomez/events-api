'use strict'

var express = require('express');

var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/user/', md_auth.ensureAuth, UserController.findAll);
//authenticate existing user
api.post('/login/', UserController.findAll);

api.post('/fb/callback/', UserController.handleFacebookSignIn);
api.post('/user/categories/', UserController.addUserCategories);
api.post('/user', UserController.createUser)
module.exports = api;