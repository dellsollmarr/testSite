let connetedUsers = {}
let User = require('../models/ModelUser');
const chatware = require('./chatware');
module.exports = async(socket) => {
    console.log("CONNECTED");
    connetedUsers[socket.handshake.query.username] = socket;
    socket.on("PrivateMessage", async(msg) => {
        if (connetedUsers[msg.reciver]) {
            connetedUsers[msg.reciver].emit('message', { text: msg.message, owner: msg.sender });
            connetedUsers[msg.sender].emit('message', { text: msg.message, owner: msg.sender });
            //console.log(msg.message);
        }
        let reciver = await User.findOne({ username: msg.reciver });
        let sender = await User.findOne({ username: msg.sender });
        let messages = reciver.privateMsg;
        if (!Object.keys(sender.privateMsg).includes(msg.reciver)) {
            sender.privateMsg[msg.reciver] = [];
            await User.updateOne({ _id: sender._id }, { privateMsg: sender.privateMsg });
            console.log(sender.privateMsg[msg.reciver]);
        }
        if (Object.keys(messages).includes(msg.sender)) {
            messages[msg.sender].push({ text: msg.message, date: Date.now() });
        } else {
            messages[msg.sender] = [{ text: msg.message, date: Date.now() }];
        }
        await User.updateOne({ _id: reciver._id }, { privateMsg: messages });
        await User.save().catch();
    });
    socket.on("disconnect", () => {
        console.log("DISCONNECTED");
    });
}