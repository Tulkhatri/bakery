const mongoose = require('mongoose');
const studentsSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    subject : [{ type: mongoose.Schema.ObjectId, ref: 'Course' }],//subject ma course ko id send garnuparyo
}, { collection: 'student' });
module.exports = mongoose.model('Student', studentsSchema)
