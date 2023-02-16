const mongoose = require('mongoose');
const cart = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
    image: { type: String },
    // description: { type: String },
    photo: { type: String },
    userId: { type: String },
    quantity: { type: String },
    totalPrice: { type: String },
    color: { type: String, default: "red" },
}, { collection: 'cart' });
module.exports = mongoose.model('cart', cart)
