const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
    image: { type: String },
}, { collection: 'products' });
module.exports = mongoose.model('products', productsSchema)
