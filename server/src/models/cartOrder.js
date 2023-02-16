const mongoose = require('mongoose');
const cartOrderProductsSchema = new mongoose.Schema({
    name: { type: [] },
    quqntity: { type: [] },
    rate: { type: [] },
    totalPrice: { type: [] },
    userId: { type: String },
    orderStatus: { type: String, default: "Pending" },
}, { collection: 'cartOrderProducts' });
module.exports = mongoose.model('cartOrderProducts', cartOrderProductsSchema)
