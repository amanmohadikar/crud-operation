// Importing the Express module
const express = require("express");

// Creating a router instance
const router = express.Router();

// Importing the product controller module
const controller = require("../controller/productController");

// Route for creating a new product
router.post("/api/items", controller.createProduct);

// Route for getting all products
router.get("/api/items", controller.getAllProduct);

// Route for getting a product by its ID
router.get("/api/items/:id", controller.getProductById);

// Route for updating a product by its ID
router.put("/api/items/:id", controller.updateProductById);

// Route for deleting a product by its ID
router.delete("/api/items/:id", controller.deleteProductById);

// Exporting the router module
module.exports = router;