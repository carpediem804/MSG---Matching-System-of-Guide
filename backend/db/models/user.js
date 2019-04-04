var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: String,
    name: String,
    id: String,
    password: String,
    type: String,
    create_date: { type:Date, default:Date.now }
});

module.exports = mongoose.model('user', userSchema);