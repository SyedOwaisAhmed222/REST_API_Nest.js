## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Add a Product
Path: /products (HTTP POST)
Description: Adds a new product to the database.
Request Body:
title (string): The title of the product.
description (string): The description of the product.
price (number): The price of the product.
Response: Returns the ID of the newly created product.
## Get All Products
Path: /products (HTTP GET)
Description: Retrieves a list of all products from the database.
Response: Returns an array of product objects.
## Get a Single Product
Path: /products/:id (HTTP GET)
Description: Retrieves a single product by its ID from the database.
URL Parameter:
id (string): The ID of the product to retrieve.
Response: Returns the product object with the specified ID.
## Update a Product
Path: /products/:id (HTTP PATCH)
Description: Updates an existing product in the database.
URL Parameter:
id (string): The ID of the product to update.
Request Body: Provide the fields you want to update:
title (string): The updated title of the product.
description (string): The updated description of the product.
price (number): The updated price of the product.
Response: Returns null after the update is completed.
## Remove a Product
Path: /products/:id (HTTP DELETE)
Description: Deletes an existing product from the database.
URL Parameter:
id (string): The ID of the product to delete.
Response: Returns null after the deletion is completed.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

