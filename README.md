## Node.js API with MongoDB - Installation and Setup Guide  
> This guide will walk you through the steps to install and set up a Node.js API with MongoDB, allowing you to build and interact with a database-driven API using JavaScript.

### Prerequisites
> Before getting started, make sure you have the following prerequisites installed on your system:

1. Node.js: Version 10 or above.
2. MongoDB: Version 3.6 or above.

### Step 1: Clone the Project Repository
Open a terminal or command prompt.

Change to the directory where you want to store your project.

- Run the following command to clone the project repository:

`git clone https://github.com/perisicnikola37/nodejs-mongo-api`

### Step 2: Install Dependencies
In the terminal or command prompt, navigate to the project directory.

Run the following command to install the project dependencies:

`npm install`

### Step 3: Configure MongoDB
Start MongoDB service on your system.

Create a new MongoDB database for your project.

### Step 4: Set Environment Variables
In the project directory, create a new file named .env.

Open the .env file and add the following variables:

DB_URL=mongodb://localhost:[port]/your_database_name

PORT=3000

Replace your_database_name with the name of your MongoDB database.

### Step 5: Start the API Server
In the terminal or command prompt, navigate to the project directory.

Run the following command to start the API server:

`npm start`

The server should start running on port 3000 (or the port you specified in the .env file).

### Step 6: Test the API
Open a web browser or API testing tool (e.g., Postman).

Send HTTP requests to http://localhost:[port]/api (or the appropriate URL).

Use the following API endpoints to interact with the Node.js API:

- GET /api/v1/users: Get all users.
- GET /api/v1/users/:id: Get a specific user by ID.
- POST /api/v1/users: Create a new user.
- PUT /api/v1/users/:id: Update a user by ID.
- DELETE /api/v1/users/:id: Delete a user by ID.
- GET /api/v1/posts: Get all posts.
- GET /api/v1/posts/:id: Get a specific post by ID.
- POST /api/v1/posts: Create a new post.
- PUT /api/v1/posts/:id: Update a post by ID.
- DELETE /api/v1/posts/:id: Delete a post by ID.

That's it! You have successfully installed and set up a Node.js API with MongoDB. 

### Functionalities:

- User Authentication: The API includes robust user authentication mechanisms, allowing users to register, log in, and manage their accounts securely.
- User Registration: Users can register for a new account by providing their necessary information, such as username, email, and password.
- User Management: The API enables administrators or authenticated users to manage user accounts, including updating user information and deleting user accounts.
- MongoDB Integration: The API seamlessly integrates with MongoDB, providing a powerful and scalable database solution for storing and retrieving user data.
- Mongoose Integration: Mongoose, an object modeling library for MongoDB, is utilized to simplify interactions with the database, making it easier to define schemas, perform CRUD operations, and handle data validation.
- Input Value Translation: The API includes an intelligent feature that automatically translates input values. This functionality enhances the user experience and enables multilingual support, allowing users to interact with the API in their preferred language.

### Technologies

- Node.js: A runtime environment that allows running JavaScript code on the server-side.
- Express.js: A fast and minimalist web application framework for Node.js, used for building the API endpoints and handling HTTP requests.
- MongoDB: A NoSQL database system that provides a flexible and scalable solution for storing and managing data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, used for modeling application data, defining schemas, and interacting with the MongoDB database.
- JWT (JSON Web Tokens): A secure method for authentication and authorization, used for generating and verifying tokens to authenticate API requests.
- Cookie Parser: A middleware for Express.js that parses HTTP request cookies and makes them available in the API's request object.
- Axios: A Promise-based HTTP client for Node.js, used for making HTTP requests to external APIs.
- dotenv: A module for loading environment variables from a .env file into Node.js process.env, used for configuring sensitive data like database connection details.
