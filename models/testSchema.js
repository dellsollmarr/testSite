var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    text: String,
    count: Number
});

module.exports = mongoose.model("test", testSchema);