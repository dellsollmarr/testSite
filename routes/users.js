var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var path = require('path');
var User = require('../models/ModelUser');
var fs = require('fs');
const passport = require('passport');
const { session } = require('passport');
const { request } = require('express');
var uploadPhoto = require('../middleware/loadPhoto');
const { error } = require('console');
var userController = require('../controllers/userController')

router.get('/login', userController.loginPage);
router.post('/login', userController.loginPost);
router.get('/registration', userController.registrationPage);
router.post('/registration', userController.registrationPost);
router.get("/logout", userController.logOut);
router.get("/profile/:id", passport.authenticate("jwt", { session: false, failureRedirect: "/users/login" }), userController.profile);
router.post("/profile/:id", passport.authenticate("jwt", { session: false, failureRedirect: "/users/login" }), uploadPhoto.single("newImage"), userController.profilePost);
module.exports = router;