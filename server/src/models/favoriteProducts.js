const mongoose = require('mongoose');
const orderProductsSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
    description: { type: String },
    photo: { type: String },
    userId: { type: String },
    color: { type: String, default: "red" },
}, { collection: 'favoriteProducts' });
module.exports = mongoose.model('favoriteProducts', orderProductsSchema)
