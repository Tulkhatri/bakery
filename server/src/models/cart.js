const mongoose = require('mongoose');
const cart = new mongoose.Schema({
   
    products: { type: mongoose.Schema.ObjectId, ref: 'Products' },
    userId: { type: String },
    quantity: { type: String },
    totalPrice: { type: String },
    
}, { collection: 'cart' });
module.exports = mongoose.model('cart', cart)
