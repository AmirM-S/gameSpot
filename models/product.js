const mongoose = require('mongoose');
const Joi = require('joi');

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

function validateProduct(product) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        genre: Joi.string().min(5).max(20).required(),
        description: Joi.string(),
        price: Joi.number().min(0).max(500).required(),
        numberInStock: Joi.number().min(0).required()
    })

    return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;