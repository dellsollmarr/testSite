var User = require('../models/ModelUser');
var Message = require("../models/ModelMessage");
const { collection } = require('../models/ModelMessage');


module.exports.showPrivateMsgsByUserName = async(req, res, next) => {
    let recivedMsgs = req.user.privateMsg[req.params.username];
    let senderUser = await User.findOne({ username: req.params.username });
    let sentMsgs = null;
    let dialogMsgs = null;

    if (recivedMsgs && senderUser.privateMsg[req.user.username]) {
        sentMsgs = senderUser.privateMsg[req.user.username];

        sentMsgs.forEach((element, index, array) => {
            array[index].owner = req.user.username;
        });
        recivedMsgs.forEach((element, index, array) => {
            array[index].owner = req.params.username;
        });

        dialogMsgs = sentMsgs.slice().concat(recivedMsgs).sort((a, b) => {
            return a.date - b.date;
        });
    }
    console.log(dialogMsgs);
    res.render('privateMsg', { chater: req.params.username, user: req.user, dialog: dialogMsgs })
}

module.exports.chatPage = async(req, res, next) => {
    let messages = await Message.find().sort("date");
    res.render('chat', { user: req.user, messages: messages, title: "chat" });
}
module.exports.privateMsgController = async(req, res, next) => {
    res.render("personalChat", { users: Object.keys(req.user.privateMsg), user: req.user })
}