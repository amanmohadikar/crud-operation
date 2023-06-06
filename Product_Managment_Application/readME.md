# Node.js CRUD API

This is a simple Node.js CRUD API project built with the Express framework. It provides endpoints for creating, retrieving, updating, and deleting products.

## Prerequisites

- Node.js installed
- NPM (Node Package Manager) installed

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/amanmohadikar/crud-operation.git

2. Install dependencies:

cd crud-operarion/
npm i
cd Product_Managment_Application/

3. Start the server:

npx nodemon src/index.js
The server will start running on http://localhost:3000


API Endpoints
Create Product
Endpoint: POST `/api/items`

Request body:
{
    productName: "Name Of product",
    description:" Some Information about product" ,
    price: "Price of Product",
    releasedAt: "When Product is released",
    availability: "Product is available or not" (true or false),
    quantityAvailable: "How much quantity is available"
}


Get All Products
Endpoint: GET `/api/items`


Get Product by ID
Endpoint: GET `/api/items/:id`


Update Product by ID
Endpoint: PUT `/api/items/:id`
Request body:
{
    price: "Price of Product",
    availability: "Product is available or not" (true or false),
    quantityAvailable: "How much quantity is available"
}


Delete Product by ID
Endpoint: DELETE `/api/items/:id`