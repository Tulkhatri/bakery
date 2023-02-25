const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    name: { type: String },
    hours: { type: String },
}, { collection: 'course' });
module.exports = mongoose.model('Course', courseSchema)
