const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    photo: String
}, { collection: 'Person' });

personSchema.set('toJSON', {//for remove _ from _id and remove _v
    transform: (document, returnedObj) => {
      returnedObj.id = returnedObj._id.toString();
      delete returnedObj._id;
      delete returnedObj.__v;
    },
  });
  
module.exports = mongoose.model('Person', personSchema)