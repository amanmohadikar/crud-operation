// Importing the Mongoose module
const mongoose = require("mongoose");

// Defining the product schema using Mongoose's Schema constructor
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    releasedAt: {
        type: Date,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    }
}, { timestamps: true }); // Including timestamps for createdAt and updatedAt fields

// Creating a model from the product schema and exporting it
module.exports = mongoose.model("product", productSchema);