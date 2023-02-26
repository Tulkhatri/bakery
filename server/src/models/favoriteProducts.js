const mongoose = require('mongoose');
const orderProductsSchema = new mongoose.Schema({

    userId: { type: String },
    products: { type: mongoose.Schema.ObjectId, ref: 'Products' },
    color: { type: String, default: "red" },

}, { collection: 'favoriteProducts' });
module.exports = mongoose.model('favoriteProducts', orderProductsSchema)
