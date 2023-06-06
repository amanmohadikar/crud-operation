// Function to validate if a value is a valid string
const isValidString = function (value) {
if (typeof value === "undefined" || value === null) return false; // Return false if the value is undefined or null
if (typeof value === "string" && value.trim().length === 0) return false; // Return false if the value is an empty string
return true; // Return true if the value is a valid non-empty string
};

// Function to validate if a name only contains letters, commas, and spaces
const isValidName = function (name) {
if (/^[a-zA-Z, ]+$/.test(name)) {
return true; // Return true if the name matches the specified pattern
}
};

// Function to validate if a date is in the format MM/DD/YYYY
const isValidDate = function (date) {
    if (/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(date)) {
      return true;
    }
  };

// Function to validate if a price is a valid format with up to 2 decimal places
const isValidPrice = function (price) {
return /^[1-9]\d{0,7}(?:.\d{1,2})?$/.test(price); // Return true if the price matches the specified pattern
};

// Exporting the validation functions as a module
module.exports = {isValidString, isValidName, isValidPrice, isValidDate};