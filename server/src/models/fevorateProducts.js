const mongoose = require('mongoose');
const orderProductsSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
    description: { type: String },
    photo: { type: String },
    userId: { type: String },
    color: { type: String, default: "red" },
}, { collection: 'fevorateProducts' });
module.exports = mongoose.model('fevorateProducts', orderProductsSchema)
