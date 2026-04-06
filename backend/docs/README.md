# Finance Management

This project is a backend system designed for a finance dashboard application where users can manage financial transactions and access data based on their assigned roles. The system emphasizes clean architecture, efficient data handling, and secure access control.

It provides a structured way to store financial records, perform CRUD operations, and generate aggregated insights for dashboard visualization. The backend is built using a feature-based architecture to ensure scalability, maintainability, and clear separation of concerns.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)

---

## Features

⚙️ Features
- Authentication
    User registration and login using JWT authentication
    Secure password hashing before storage
    Token-based authentication for protected routes
    Endpoint to fetch currently authenticated user (/auth/me)

- Role-Based Access Control (RBAC)
    User → Can create, view, and manage their own transactions
    Admin → Full access including user management and data control
    Middleware-based authorization for secure and reusable access control
    Prevents unauthorized access to sensitive operations
- Transaction Management
    Create, read, update, and delete financial transactions
    Each transaction includes:
    Amount
    Type (income/expense)
    Category
    Date
    Notes
    Users can only access their own transactions
- Dashboard & Analytics
    Total income and total expenses
    Net balance calculation
    Category-wise breakdown
    Monthly financial trends
    Recent transactions
    Implemented using MongoDB aggregation pipelines
- Pagination
    Efficient handling of large datasets
    Supports query parameters:
    page (page number)
    limit (records per page)
    Improves performance and reduces response size
- Rate Limiting
    Limits number of API requests per client
    Protects against abuse and excessive traffic
    Enhances backend stability and security
- Validation & Error Handling
    Input validation for all API endpoints
    Consistent error responses
    Proper HTTP status codes
    Handles invalid and unauthorized requests gracefully
- User Management (Admin Only)
    Retrieve all users
    Get user details by ID
    Update user roles
    Delete users
    Ensures controlled access to user-related operations
- Scalable Architecture
    Feature-based folder structure
    Separation of concerns (controllers, services, middleware)
    Modular and maintainable codebase
    Designed for scalability and future enhancements

---

## Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- Redis
- JWT for authentication
- POSTMAN for testing API
- DOTENV for managing environment variables

---

## Installation

Clone the repo and install dependencies:

git clone https://github.com/tushar-tayal-t/Financial-Management.git
cd Financial-Management/backend
npm run build


## Environment Variables

Create a .env file at the root and add the following variables:

PORT=5000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=mongodb_srv_url
REDIS_URL=upstash_redis_url

## Running the Project

Development mode:
  npm run build
  npm run dev

  or 

  npm run dev1     (with tsx compiler in watch mode)

Build and run:
  npm run build
  npm run start

## API Endpoints

Auth Endpoints

POST /api/auth/register
Register a new user.

Url: http://localhost:5000/api/auth/register

Request Body:

{
  "name": "johndoe",
  "email": "johndoe@gmail.com",
  "password": "securepassword123"
}

Validation:

Name: Must be at least 3 characters long.
Password: Must be at least 8 characters long.
email: Email must be valid and unique.

Response:

{
  "success":true,
  "message":"User registered successfully"
}


POST /api/auth/login
login user.

Url: http://localhost:5000/api/auth/login

Request Body:

{
  "email": "johndoe@gmail.com",
  "password": "securepassword123"
}

Validation:

Password: Must be at least 8 characters long.
email: Email must be valid.

Response:

{
  "success":true,
  "message":"User login successfully",
  "email":"johndoe@gmail.com",
  "token":"eyJhbGciOiJ..."
}

GET /api/auth/me
fetch user detail with bearer token.

Url: http://localhost:5000/api/auth/me

Authentication:
  Authorization Header: You must include a JWT token in the Authorization header.
  Format: Authorization: Bearer <JWT_TOKEN>
  This token will be used to authenticate the user.

Response:

{
  "success": true,
  "message": "Successfully fetch user detail",
  "user": {
      "_id": "69..",
      "name": "johndoe",
      "email": "johndoe@gmail.com",
      "isActive": true,
      "role": "USER",
      "password": "$2b$10$...",
      "createdAt": "2026-04-05T15:43:33.490Z",
      "updatedAt": "2026-04-05T17:30:21.508Z",
      "__v": 0
  }
}

Transaction routes

POST /api/transactions/create
Create transaction of user.

Url: http://localhost:5000/api/transations/create

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.

Rate Limiting:
  This endpoint is protected with rate limiting to prevent abuse.
  Limits the number of requests a user can make within a specific time window.
  If the limit is exceeded, the API returns:
  {
    "success": false,
    "message": "Too many requests"
  }

Request Body:

{
  "amount": "40",
  "type": "EXPENSE", or "INCOME"
  "category": "FOOD",
  "note": "Last saturday restaurant visit"
}

🧾 Fields
  amount (number or string, required) → Transaction amount
  type (string, required) → Must be either "INCOME" or "EXPENSE"
  category (string, required) → Category of transaction (e.g., FOOD, TRAVEL)
  note (string, optional) → Additional description

Response:

{
  "success":true,
  "message":"Successfully created transaction",
  "transaction":{
    "amount":40,
    "type":"EXPENSE",
    "category":"FOOD",
    "note":"Last saturday restaurant visit",
    "createdBy":"69...",
    "_id":"69...",
    "createdAt":"2026-04-06T05:16:46.762Z",
    "updatedAt":"2026-04-06T05:16:46.762Z",
    "__v":0
  }
}



GET /api/transactions/all?limit=2&page=2
Fetches a list of transaction with pagination.

Url: http://localhost:5000/api/transations/all?limit=2&page=2

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.

Query Parameters (Optional):
- **limit**: The number of users to return per page. Default value is 10.
- **page**: The page number to return. Default value is 1.

Response:

{
  "success":true,
  "message":"Successfully fetched all user transaction",
  "transaction": [
    {
      "_id":"69...",
      "amount":40,
      "type":"EXPENSE",
      "category":"FOOD",
      "note":"Last saturday restaurant visit",
      "createdBy":"69...",
      "createdAt":"2026-04-05T18:14:35.712Z",
      "updatedAt":"2026-04-05T18:14:35.712Z",
      "__v":0
    },
    {
      "_id":"69...",
      "amount":40,
      "type":"EXPENSE",
      "category":"FOOD",
      "note":"Last saturday restaurant visit",
      "createdBy":"69...",
      "createdAt":"2026-04-05T18:14:34.387Z",
      "updatedAt":"2026-04-05T18:14:34.387Z",
      "__v":0
    }
  ],
  "limit":2,
  "page":2,
  "user":
    {
      "name": "johndoe",
      "email": "johndoe@gmail.com",
    }
}


GET /api/transations/69...
It gets a transaction by id.

Url: http://localhost:5000/api/transations/69...

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.


Response:

{
  "success":true,
  "message":"Successfully fetched the transaction",
  "transaction":{
    "_id":"69...",
    "amount":40,
    "type":"INCOME",
    "category":"SALARY",
    "createdBy":"69...",
    "createdAt":"2025-04-05T16:06:58.481Z",
    "updatedAt":"2026-04-05T16:06:58.481Z",
    "__v":0
  }
}


PUT /api/transations/update/69..
update a transaction by id.

Url: http://localhost:5000/api/transations/update/69..

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.

Description
Updates an existing transaction by its ID. This operation is restricted to Admin users only.

Request Body:

{
  "amount": 20,
  "type": "EXPENSE",
  "note": "this is updated expense",
  "createdAt": "2025-06-06",
  "category": "FOOD"
}

Fields (All Optional)
  amount (number | string) → Updated transaction amount
  type (string) → "INCOME" or "EXPENSE"
  category (string) → Transaction category
  note (string) → Description
  date (string) → Transaction date (ISO format)

Response:

{
  "success":true,
  "message":"Successfully updates the transaction",
  "transaction": {
    "_id":"69...",
    "amount":20,
    "type":"EXPENSE",
    "category":"SALARY",
    "createdBy":"69...",
    "createdAt":"2025-04-05T16:06:58.481Z",
    "updatedAt":"2026-04-05T16:06:58.481Z",
    "__v":0,
    "note":"this is updated expense"
  }
}


DELETE /api/transations/delete/69...
Delete transaction by id.

Url: http://localhost:5000/api/transations/delete/69...

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.

Description
Delete an existing transaction by its ID. This operation is restricted to Admin users only.

Response:

{
  "success":true,
  "message":"Successfully delete the transaction",
  "transaction":{
    "_id":"69...",
    "amount":20,
    "type":"EXPENSE",
    "category":"SALARY",
    "createdBy":"69...",
    "createdAt":"2025-04-05T16:06:58.481Z",
    "updatedAt":"2026-04-06T05:44:20.604Z",
    "__v":0,
    "note":"this is updated expense"
  }
}


GET /api/dashboard/summary
It helps to get the summary from dashboard.

Url: http://localhost:5000/api/dashboard/summary

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.


Response:

{
  "success":true,
  "message":"Successfully fetched transaction summary",
  "summary":{
    "totalIncome":266,
    "totalExpense":260,
    "netBalance":6
  }
}


GET /api/dashboard/categories
It helps to get the categories based summary from dashboard route.

Url: http://localhost:5000/api/dashboard/categories

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.


Response:


{
  "success":true,
  "message":"Successfully fetched category transaction",
  "summary":
    {
      "FOOD":260,
      "SALARY":266
    }
}


GET /api/dashboard/monthly
It helps to get the monthly and yearly based summary from dashboard route.

Url: http://localhost:5000/api/dashboard/monthly

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.


Response:

{
  "success": true,
  "message": "Successfully fetched monthly transaction",
  "summary": [
      {
          "income": 32,
          "expense": 260,
          "month": "April",
          "year": 2026
      },
      {
          "income": 234,
          "expense": 0,
          "month": "April",
          "year": 2025
      }
  ]
}


GET /api/dashboard/recent-transaction
It helps to get the recent transaction from dashboard route.

Url: http://localhost:5000/api/dashboard/recent-transaction

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.


Response:

{
  "success": true,
  "message": "Successfully fetched recent transaction",
  "transactions": [
      {
          "_id": "69...",
          "amount": 234,
          "type": "INCOME",
          "category": "SALARY",
          "note": "this is salary transaction",
          "createdBy": "69...",
          "createdAt": "2025-04-05T16:08:24.892Z",
          "updatedAt": "2026-04-05T16:08:24.892Z",
          "__v": 0
      },
      {
          "_id": "69...",
          "amount": 99,
          "type": "INCOME",
          "category": "SALARY",
          "note": "this is salary transaction",
          "createdBy": "69...",
          "createdAt": "2025-04-05T16:08:24.892Z",
          "updatedAt": "2026-04-05T16:08:24.892Z",
          "__v": 0
      }
  ]
}



GET /api/user/all-users?limit=1&page=2
It helps to get all the users from user route.

Url: http://localhost:5000/api/user/all-users?limit=1&page=2

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.

Description
Get all users from user route. This operation is restricted to Admin users only.

Query Parameters (Optional):
- **limit**: The number of users to return per page. Default value is 10.
- **page**: The page number to return. Default value is 1.

Response:

{
  "success":true,
  "message":"Fetched all users successfully",
  "users":[
    {
      "_id":"69...",
      "name":"admin",
      "email":"admin@gmail.com",
      "isActive":true,
      "role":"ADMIN",
      "password":"$2b$10$gDH3U8z27zBhq...",
      "createdAt":"2026-04-05T15:43:33.490Z",
      "updatedAt":"2026-04-05T17:30:21.508Z",
      "__v":0
    }
  ],
  "limit":1,
  "page":2
}



GET /api/user/all-users?limit=1&page=2
It helps to get user by id from user route.

Url: http://localhost:5000/api/user/69...

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.

Description
Get user by id from user route. This operation is restricted to Admin users only.

Response:

{
  "success": true,
  "message": "User fetched successfully",
  "user": {
      "_id": "69...",
      "name": "user",
      "email": "user@gmail.com",
      "isActive": true,
      "role": "USER",
      "password": "$2b$10$g....",
      "createdAt": "2026-04-05T15:43:33.490Z",
      "updatedAt": "2026-04-05T17:30:21.508Z",
      "__v": 0
  }
}


PUT /api/user/update-role
It helps to update the user role.

Url: http://localhost:5000/api/user/update-role

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.

Description
This operation is restricted to Admin users only.

Request body:

{
  "id": "69...",
  "role": "ADMIN" or "USER"
}

Response:

{
  "success":true,
  "message":"User role updated successfully",
  "user":
    {
      "_id":"69...",
      "name":"user",
      "email":"user@gmail.com",
      "isActive":true,
      "role":"ADMIN",
      "password":"$2b$10$gDH3U8z...",
      "createdAt":"2026-04-05T15:43:33.490Z",
      "updatedAt":"2026-04-05T17:30:21.508Z",
      "__v":0
    }
}


DELETE /api/user/delete/69...
It helps to delete the user.

Url: http://localhost:5000/api/user/delete/69...

Authentication:
Authorization Header: You must include a JWT token in the Authorization header.
Format: Authorization: Bearer <JWT_TOKEN>
This token will be used to authenticate the user.

Description

  Deletes a user by their ID. This operation is restricted to Admin users only.

  If the user has no associated transactions, the user is permanently deleted (hard delete)
  If the user has existing transactions, the account is deactivated by setting isActive to false (soft delete)

Response:

{
  "success":true,
  "message":"User deleted successfully",
  "user":{
    "_id":"69...",
    "name":"user",
    "email":"user@gmail.com",
    "isActive":false,
    "role":"ADMIN",
    "password":"$2b$10$gDH3U...",
    "createdAt":"2026-04-05T15:43:33.490Z",
    "updatedAt":"2026-04-06T06:29:27.303Z",
    "__v":0
  }
}


