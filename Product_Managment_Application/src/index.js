// Importing required modules
const express = require('express'); // Express.js framework for building web applications
const route = require('./route/route'); // Custom route file for handling HTTP requests
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling

const app = express(); // Creating an instance of the Express application

app.use(express.json()); // Parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded request bodies

// Connecting to MongoDB database
mongoose.connect("mongodb+srv://Aman_Mohadikar:V5FW1Y8X6b2pIiud@cluster0.gdww84s.mongodb.net/aman-535", {
useNewUrlParser: true
})
.then(() => console.log("MongoDb is connected")) // Displaying success message if connection is successful
.catch(err => console.log(err)); // Displaying error message if connection fails

app.use('/', route); // Mounting the custom route to the application

// Starting the server on specified port
app.listen(process.env.PORT || 3000, function () {
console.log('Express app running on port ' + (process.env.PORT || 3000));
});