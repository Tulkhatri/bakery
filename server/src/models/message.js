const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    message: { type: String },
    userId: { type: String },

}, { collection: 'message' });
module.exports = mongoose.model('message', messageSchema)
