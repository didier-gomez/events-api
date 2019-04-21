'use strict'
var User = require('../models/user');
function getUser(req, res){
    var userId = req.params.id;
    User.findById(userId, (err, user) => {
        if(err)
            return res.status(500).send({message: 'Error en la petición'});
        if(!user) 
            return res.status(404).send({message: 'EL usuario no existe'});
        followThisUser(req.user.sub, userId).then((value) => {
            user.password = undefined;
            return res.status(200).send({
                user,
                following: value.following,
                followed: value.followed
            });
        });
    });
}
function findAll(req, res){
    User.find((err, users) => {
        if(err)
            return res.status(500).send({message: 'Error en la petición'});
        if(!users) 
            return res.status(404).send({message: 'No hay usuarios'});
        return res.status(200).send({users});
        });
}

module.exports = {getUser, findAll}