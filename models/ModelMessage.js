var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    owner: String,
    text: String,
    date: Date
});

module.exports = mongoose.model("messages", messageSchema);