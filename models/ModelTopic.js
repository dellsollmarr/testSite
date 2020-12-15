var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
    owner: String,
    name: String,
    dateOfcreate: Date
});

module.exports = mongoose.model("topics", TopicSchema);