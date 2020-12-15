var Message = require("../models/ModelMessage");
var counter = 0;
var conncetedUsers = [];
module.exports = async(socket) => {
    // console.log(socket);
    conncetedUsers.push(socket);
    socket.on('message', async(message) => {
        if (counter == 5) {
            console.log(counter);
            var messages = await Message.find().sort("date");
            for (let i = 0; i < messages.length - 5; i++) {
                await Message.deleteOne(messages[i]);
            }
            counter = 0;
        }
        counter++;
        conncetedUsers.forEach((user) => {
            user.emit('message', message);
        });
        let newMessage = new Message({ owner: message.username, text: message.message, date: Date.now() });
        await newMessage.save();
    })

    await socket.on("disconnect", () => {
        for (let i = 0; i < conncetedUsers.length; i++) {
            if (conncetedUsers[i] == socket) {
                conncetedUsers.splice(i);
            }
        }
        // console.log(':DISCONECTED:')
        //console.log(" " + " " + conncetedUsers.length);     
    });
};