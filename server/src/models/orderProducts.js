const mongoose = require('mongoose');
const orderProductsSchema = new mongoose.Schema({

    products: { type: mongoose.Schema.ObjectId, ref: 'Products' },
    userId: { type: String },
    orderStatus: { type: String, default: "Pending" },
    quantity: { type: Number }
}, { collection: 'orderProducts' });
module.exports = mongoose.model('orderProducts', orderProductsSchema)
