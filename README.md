# Node.js API with MongoDB - Installation and Setup Guide
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

Use the API endpoints defined in the project to interact with the MongoDB database.

That's it! You have successfully installed and set up a Node.js API with MongoDB. 