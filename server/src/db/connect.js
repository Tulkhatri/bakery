const mongoose = require('mongoose');
module.exports = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/live_bakery', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected to mongodb');
    } catch (error) {
        console.error(error);
    }
}