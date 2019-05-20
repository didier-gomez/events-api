'use strict'

var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    nickname: String,
    email: String,
    password: String,
    role: String, 
    image: String,
    fb_id: String,
    fb_token: String,
    categories: Object
});

module.exports = mongoose.model('User', UserSchema);