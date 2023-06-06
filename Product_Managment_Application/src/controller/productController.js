// Importing the productModel module for interacting with the product database
const productModel = require("../model/productModel");

// Importing the validator module for data validation
const validator = require("../validator/validator");

// Importing the Mongoose module for using Mongoose functions
const mongoose = require("mongoose");

// Imports the logger module from the "../logger.js" file and assigns it to the variable "logger".
const logger = require("../logger.js")

// Function to create a new product
const createProduct = async (req, res) => {
    try {
        let data = req.body; // Get the request body
        let { productName, description, price, releasedAt, availability, quantityAvailable } = data; // Destructure the data object
        // Validate if all required fields are present
        if (!(productName && description && price && releasedAt && quantityAvailable)) {
            return res.status(400).send({ status: false, message: "All fields are mandatory" });
        }

        // Validate the product name
        if (!validator.isValidName(productName)) {
            return res.status(400).send({ status: false, message: "Name should be valid" });
        }

        // Validate the description
        if (!validator.isValidName(description)) {
            return res.status(400).send({ status: false, message: "Description should be valid" });
        }

        // Validate the price
        if (!validator.isValidPrice(price)) {
            return res.status(400).send({ status: false, message: "Price should be valid" });
        }

        // Validate the releasedAt date
        if (!validator.isValidDate(releasedAt)) {
            return res.status(400).send({ status: false, message: "Date should be valid" });
        }

        // Validate the availability
        if (availability) {
            if (availability !== true && availability !== false) {
                return res.status(400).send({ status: false, message: "Availability should be True or False" });
            }
        }

        // Validate the quantityAvailable
        if (!validator.isValidPrice(quantityAvailable)) {
            return res.status(400).send({ status: false, message: "Quantity value should be valid" });
        }

        // Create a new product using the productModel
        let newData = await productModel.create(data);

        // Logs an informational message using the "productLogger" logger, with the severity level set to "info", and the content "Successfully create product".
        logger.productLogger.log("info", "Successfully create product")
        return res.status(201).send({ status: true, message: "Product created Successfully", data: newData });
    }
    catch (error) {
        // Logs an error message using the "productLogger" logger, with the severity level set to "error", and the error message as the content.
        logger.productLogger.log("error", error.message)
        return res.status(500).send({ status: false, message: error.message });
    }
}




// Function to get all available products
const getAllProduct = async (req, res) => {
    try {
        let data = await productModel.find({ availability: true }); // Retrieve all products with availability set to true
        // If no products are found, return a 404 status and error message
        if (data.length < 1) {
            return res.status(404).send({ status: false, message: "No product found" });
        }

        // Logs an informational message using the "productLogger" logger, with the severity level set to "info", and the content "Successfully create product".
        logger.productLogger.log("info", "Successfully get products")
        // Return a 200 status with the retrieved product data
        return res.status(200).send({ status: true, data: data });
    }
    catch (error) {
        // Logs an error message using the "productLogger" logger, with the severity level set to "error", and the error message as the content.
        logger.productLogger.log("error", error.message)
        return res.status(500).send({ status: false, message: error.message });
    }
}




// Function to get a product by its ID
const getProductById = async (req, res) => {
    try {
        let id = req.params.id; // Get the product ID from the request parameters

        // Check if the provided ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: false, message: "Id should be valid" });
        }

        let isIdExist = await productModel.findById(id); // Find the product by its ID in the database

        // If the product with the given ID does not exist, return a 404 status and error message
        if (!isIdExist) {
            return res.status(404).send({ status: false, message: "Id does not exist" });
        }

        // Logs an informational message using the "productLogger" logger, with the severity level set to "info", and the content "Successfully create product".
        logger.productLogger.log("info", "Successfully get product By Id")
        // Return a 200 status with the retrieved product data
        return res.status(200).send({ status: false, data: isIdExist });
    }
    catch (error) {
        // Logs an error message using the "productLogger" logger, with the severity level set to "error", and the error message as the content.
        logger.productLogger.log("error", error.message)
        return res.status(500).send({ status: false, message: error.message });
    }

}





// Function to update a product by its ID
const updateProductById = async (req, res) => {
    try {
        let id = req.params.id; // Get the product ID from the request parameters
        let data = req.body; // Get the updated product data from the request body
        let { price, availability, quantityAvailable } = data; // Destructure the updated fields from the data
        // Check if the provided ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: false, message: "Id should be valid" });
        }

        let isIdExist = await productModel.findById(id); // Find the product by its ID in the database

        // If the product with the given ID does not exist, return a 404 status and error message
        if (!isIdExist) {
            return res.status(404).send({ status: false, message: "Id does not exist" });
        }

        // Update the product data in the database
        let updateData = await productModel.findByIdAndUpdate(
            { _id: id },
            { $set: { price: price, availability: availability, quantityAvailable: quantityAvailable } },
            { new: true }
        );

        // Validate the updated fields
        if (price) {
            if (!validator.isValidPrice(price)) {
                return res.status(400).send({ status: false, message: "Price should be valid" });
            }
        }
        if (availability) {
            if (availability !== true && availability !== false) {
                return res.status(400).send({ status: false, message: "Availability should be True or False" });
            }
        }
        if (quantityAvailable) {
            if (!validator.isValidPrice(quantityAvailable)) {
                return res.status(400).send({ status: false, message: "Quantity value should be valid" });
            }
        }

        // Logs an informational message using the "productLogger" logger, with the severity level set to "info", and the content "Successfully create product".
        logger.productLogger.log("info", "Successfully update product")
        // Return a 201 status with a success message and the updated product data
        return res.status(201).send({ status: false, message: "Product Update Successfully", data: updateData });
    }
    catch (error) {
        // Logs an error message using the "productLogger" logger, with the severity level set to "error", and the error message as the content
        logger.productLogger.log("error", error.message)
        // Return a 500 status with an error message if an error occurs during the update process
        return res.status(500).send({ status: false, message: error.message });
    }
}





// Function to delete a product by its ID
const deleteProductById = async (req, res) => {
    try {
        let id = req.params.id; // Get the product ID from the request parameters
        // Check if the provided ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: false, message: "Id should be valid" });
        }

        let isIdExist = await productModel.findById(id); // Find the product by its ID in the database

        // If the product with the given ID does not exist, return a 404 status and error message
        if (!isIdExist) {
            return res.status(404).send({ status: false, message: "Id does not exist" });
        }

        await productModel.findByIdAndDelete({ _id: id }); // Delete the product from the database

        // Logs an informational message using the "productLogger" logger, with the severity level set to "info", and the content "Successfully create product".
        logger.productLogger.log("info", "Successfully delete product")
        // Return a 200 status with a success message
        return res.status(200).send({ status: false, message: "Product Deleted Successfully" });
    }
    catch (error) {

        // Logs an error message using the "productLogger" logger, with the severity level set to "error", and the error message as the content.
        logger.productLogger.log("error", error.message)
        // Return a 500 status with an error message if an error occurs during the deletion process
        return res.status(500).send({ status: false, message: error.message });
    }

}


// Exporting the functions as a module
module.exports = { createProduct, getAllProduct, getProductById, updateProductById, deleteProductById }