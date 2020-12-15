var Topic = require('../models/ModelTopic');
var User = require('../models/ModelUser');
var jwt = require('jsonwebtoken');

module.exports.mainPageTopics = async function(req, res, next) {
    let user = null;
    try {
        let username = jwt.verify(req.cookies['Authorization'], "verySecretKey")['username'];
        user = await User.findOne({ 'username': username });
        delete user['password'];
        console.log(user);
    } catch (e) {
        console.error(e);
    }
    let result = null;
    try {
        result = await Topic.find();
    } catch (e) {
        console.error(e);
    }
    res.render('topics', { title: 'Topics', topics: result, user: user });
}

module.exports.topicIdController = async function(req, res, next) {
    let id = req.params.id;
    Topic.findById(id, function(error, result) {
        if (error) {
            res.render('error', { error: error })
        } else {
            res.render('topicLayout', { name: "topicLayout", topic: result, user: req.user });
        }
    });
}

module.exports.removeTopicController = async function(req, res, next) {
    Topic.remove({ '_id': req.body._id }, function(e) {
        if (e) {
            console.error(e);
        } else {
            res.redirect('/');
        }
    });
}
module.exports.createTopicController = async function(req, res, next) {
    res.render('createNewTopic', { title: 'Создать новую тему', user: req.user });
}
module.exports.createTopicPost = async function(req, res, next) {
    let topic = new Topic({ owner: req.body.username, name: req.body.topicName, dateOfcreate: Date.now() });
    await topic.save();
    res.redirect('/');
}