const mongoose = require('mongoose');
const Joi = require('joi');

const purchaseSchema = new mongoose.Schema({
    user: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 20
            },
            email: {
                type: String,
                required: true,
                unique: false,
                maxlength: 50
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        })
    },
    product: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            }
        })
    },
    quantity: {
        type: Number
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);



exports.Purchase = Purchase;