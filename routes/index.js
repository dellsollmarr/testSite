var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require("jsonwebtoken");

var Message = require("../models/ModelMessage");
var Topic = require('../models/ModelTopic');
var User = require('../models/ModelUser');
var Restaurant = require('../models/ModelRestaraunt');
const testSchema = require('../models/testSchema');
const { schema } = require('../models/ModelMessage');
var chatController = require('../controllers/chatController');
var topicController = require('../controllers/topicController');
var auth = passport.authenticate('jwt', { session: false, failureRedirect: "/" });

router.get('/', topicController.mainPageTopics);
router.get('/topics/:id', passport.authenticate('jwt', { session: false, failureRedirect: "/" }), topicController.topicIdController);
router.post('/topics/:id', passport.authenticate('jwt', { session: false }), topicController.removeTopicController);
router.get('/createNewTopic', passport.authenticate('jwt', { session: false, failureRedirect: "/" }), topicController.createTopicController);
router.post('/createNewTopic', passport.authenticate('jwt', { session: false, failureRedirect: "/" }), topicController.createTopicPost);
router.get('/chat', auth, chatController.chatPage);
router.get('/privateMessages', auth, chatController.privateMsgController);
router.get('/privateMessages/:username', auth, chatController.showPrivateMsgsByUserName);

router.get('/userlist', auth, async(req, res, next) => {
    let users = await User.find();;
    res.render('userlist', { user: req.user, users: users })
});
router.get('/testCreation', async function(require, respons, next) {
    let newData = new testSchema({
        "text": "test",
        "count": 3
    })
    await newData.save();
    respons.send(newData);
    respons.redirect('/')
});



module.exports = router;