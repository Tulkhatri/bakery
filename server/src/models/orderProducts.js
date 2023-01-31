const mongoose = require('mongoose');
const orderProductsSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
    image: { type: String },
}, { collection: 'orderProducts' });
module.exports = mongoose.model('orderProducts', orderProductsSchema)
