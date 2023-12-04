# Mongoose Express CRUD Mastery

## Vercel domain
https://mongoose-assignment-eta.vercel.app/

## Github repository
https://github.com/SheuliAkterShathy/mongoose-assignment

## Assignment-Summary
This assignment is a Node.js Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management.

This project is with the types of userInterface and userModels.For storing data used mongodb with mongoose,zod for appropriate validation, bcrypt for hashing password.

## Local Setup 
Clone the repository git clone https://github.com/SheuliAkterShathy/mongoose-assignment

* Navigate to the project directory cd your-folder

* Install dependencies npm install



## Project running
* For development mode: npm run start:dev
* For production mode : npm run build

## EndPoints
* POST /api/users:For creating a new user.
* GET /api/users: For getting all users.
* GET /api/users/:userId: For getting a single user by userId.
* PUT /api/users/:userId: For updating a user by userId.
* DELETE /api/users/:userId: For deleting a user by userId.
* PUT /api/users/:userId/orders: For adding a new product to a user's orders.
* GET /api/users/:userId/orders: For getting all orders for a user.
* GET /api/users/:userId/orders/total-price: For getting the total price of all  orders for single user.
 