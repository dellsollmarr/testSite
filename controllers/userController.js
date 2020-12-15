var User = require('../models/ModelUser');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports.loginPage = function(request, respons, next) {
    respons.render('logIn');
}
module.exports.loginPost = async function(request, respons, next) {
    let loginToCheck = await User.findOne({ "username": request.body.username });
    if (loginToCheck) {
        if (bcrypt.compareSync(request.body.password, loginToCheck.password)) {
            let token = jwt.sign({ username: loginToCheck.username, age: loginToCheck.age }, "verySecretKey", { expiresIn: 60 * 60 });
            respons.cookie('Authorization', token);
            respons.redirect('/');
        } else {
            respons.redirect('/users/login');
        }
    } else {
        respons.redirect('/users/login');
    }
}
module.exports.registrationPage = function(request, respons, next) {
    respons.render('registrationPage');
}
module.exports.registrationPost = async function(request, respons, next) {
    let login = request.body.username;
    let loginToCheck = await User.findOne({ "username": login });
    if (loginToCheck) {
        respons.status(401).render('registrationPage'); // 401 = Unauthorized
    } else {
        var pass = request.body.password;
        var salt = bcrypt.genSaltSync(13);
        var hash = bcrypt.hashSync(pass, salt);
        let newUser = new User({
            "username": request.body.username,
            "password": hash,
            "name": request.body.name,
            "age": request.body.age,
            "DateOfRegistration": Date.now(),
            "photo": ""
        });
        await newUser.save();
        respons.status(201).redirect('/');
    }
}
module.exports.logOut = (request, respons, next) => {
    respons.clearCookie('Authorization');
    respons.redirect('/');
}
module.exports.profile = async(request, respons, next) => {
    let user = await User.findById(request.params.id);
    let authUser = request.user;
    respons.render("profile", { user: authUser, profile: user })
}
module.exports.profilePost = async(request, respons, next) => {
    let user = request.user;
    let findUser = await User.findById(request.params.id);
    let id = request.params.id;
    console.log(request.file);
    if (id != user.id) {
        respons.render("profile", { user: findUser, message: "You cant edit this profile" })
        return;
    }
    if (request.file) {
        await User.updateOne({ "_id": id }, { "name": request.body.name, "age": request.body.age, 'photo': request.user.username });
    } else {
        await User.updateOne({ "_id": id }, { "name": request.body.name, "age": request.body.age });
    }

    respons.render("profile", { user: await User.findById(id) })
}