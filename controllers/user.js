'use strict'
const SECRET_KEY = "secretkey23456";
const jwt = require('jsonwebtoken');

var User = require('../models/user');
function getUser(req, res) {
    var userId = req.params.id;
    User.findById(userId, (err, user) => {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });
        if (!user)
            return res.status(404).send({ message: 'EL usuario no existe' });
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
function findAll(req, res) {
    User.find((err, users) => {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });
        if (!users)
            return res.status(404).send({ message: 'No hay usuarios' });
        return res.status(200).send({ users });
    });
}


function createUser(req, res) {
    let user = new User();
    user.name = req.body.name;
    user.nickname = req.body.nickname;
    user.password = req.body.password;
    user.email = req.body.email;
    user.role = 2;
    return res.status(200).send(user);
}


function handleFacebookSignIn(req, res) {
    User.find({ fb_id: req.body.fb_id }, (err, users) => {
        if (err) {
            console.log(err);
        }
        if (users.length) {
            let user = users[0];
            let response = {
                'dataUser': user
            }
            return res.status(200).json(response);
        } else {
            let user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.image = req.body.image;
            user.fb_token = req.body.fb_token;
            user.fb_id = req.body.fb_id;
            user.role = 2;
            user.save((err, doc) => {
                if (err) return res.status(500).send("Server error!");
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: doc.id }, SECRET_KEY, {
                    expiresIn: expiresIn
                });
                let response = {
                    'dataUser': {
                        accessToken: accessToken,
                        expiresIn: expiresIn,
                        name: doc.name,
                        image: doc.image,
                        id: doc.id
                    }
                };
                return res.status(200).send(response);
            });
        }
    });
}


function addUserCategories(req, res) {
    User.findById(req.body.user_id, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(200).json({ success: false, "error": "DB Error" });
        }
        if (user) {
            user.set({ categories: req.body.categories });
            user.save((err, doc) => {
                if (err) return res.status(200).json({success: false});
                return res.status(200).json({success: true, data: doc});
            });
        } else {
            return res.status(200).json({ success: false , "error": "user not found"});
        }
    });
}

module.exports = {
    getUser,
    findAll,
    createUser,
    handleFacebookSignIn,
    addUserCategories
}