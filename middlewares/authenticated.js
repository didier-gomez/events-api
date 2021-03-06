'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_';
exports.ensureAuth = function(req, res, next){
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept");

    next();
}