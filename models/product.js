const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 500
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0
    }
});

const Product = mongoose.model('Product', productSchema);

exports.Product = Product;