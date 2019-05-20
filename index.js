'use strict'

var mongoose = require('mongoose');

var app = require('./app');

var app_port = 3800;
var ip = "127.0.0.1";

mongoose.Promise = global.Promise;
mongoose
    .connect(`mongodb://${ip}:27017/event_api`)
    .then(() => {
        console.log("La conexión a la base de datos event_api se ha realizado correctamente")    
        app.listen(app_port, () => {
            console.log(`servidor corriendo en ${ip}:${app_port}`);
        });
    })
    .catch(err => console.log(err));