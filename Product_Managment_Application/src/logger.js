// Imports the necessary modules and components from the "winston" library. 
// Creates a logger instance called "productLogger" with two file 
// transports: one for logging "info" level messages to a file named "product.log", 
// and another for logging "error" level messages to a file named "product-error.log". 
// The logger uses a format that combines a timestamp and JSON formatting. Finally, 
// exports the "productLogger" object for use in other modules.

const { createLogger, transports, format } = require("winston")

const productLogger = createLogger({
    transports: [
        new transports.File({
            filename: "product.log",
            level: "info",
            format: format.combine(format.timestamp(), format.json())
        }),

        new transports.File({
            filename: "product-error.log",
            level: "error",
            format: format.combine(format.timestamp(), format.json())
        })

    ]
})

module.exports = { productLogger }