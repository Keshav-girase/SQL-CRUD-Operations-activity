# SQL CRUD Operations Activity

## Description
This project demonstrates basic CRUD (Create, Read, Update, Delete) operations using a Node.js server with Express.js and a MySQL database. It uses EJS for templating and Faker.js for generating random user data.

## Technologies Used
- Node.js
- Express.js
- MySQL
- EJS (Embedded JavaScript templating)
- Faker.js
- Method-Override

## Features
- Create new users with random data using Faker.js
- Read and display user data from the MySQL database
- Update user information
- Delete users

## Installation Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/Keshav-girase/SQL-CRUD-Operations-activity.git
    ```
2. Navigate to the project directory:
    ```bash
    cd SQL-CRUD-Operations-activity
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```
4. Set up the MySQL database:
    - Ensure MySQL server is running.
    - Create a database named `delta_app`.
    - Create a table named `user` with columns `id`, `username`, `email`, and `password`.

5. Start the server:
    ```bash
    node index.js
    ```

## Usage
1. Navigate to `http://localhost:8080` in your web browser to view the homepage.
2. The homepage will display the count of users in the database.
3. Navigate to `http://localhost:8080/user` to view the list of all users.
4. Edit a user's information by navigating to `http://localhost:8080/user/:id/edit`, replacing `:id` with the user's ID.
5. Update a user's information by submitting the edit form.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

### Dependencies
```javascript
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
