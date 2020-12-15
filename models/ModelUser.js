var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    age: Number,
    photo: String,
    DateOfRegistration: Date,
    privateMsg: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { minimize: false });

module.exports = mongoose.model("users", UserSchema); // удалить 1 чтобы заработало