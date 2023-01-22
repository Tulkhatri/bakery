const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    //email: { type: String, require: true },//yesari model mai validation garna pani sakinxa
    password: { type: String },
    avatar: { type: String },

}, { collection: 'users' });
module.exports = mongoose.model('users', userSchema)
