var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    topic: String,
    commentator: String,
    dateOfcommentation: Date,
    text: String
});

module.exports = mongoose.model("comment", CommentSchema);