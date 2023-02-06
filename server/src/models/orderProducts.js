const mongoose = require('mongoose');
const orderProductsSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
    description: { type: String },
    userId: { type: String },
    orderStatus: { type: String, default: "Pending" },
}, { collection: 'orderProducts' });
module.exports = mongoose.model('orderProducts', orderProductsSchema)
