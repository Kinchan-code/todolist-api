# TodoList API

A personal project for managing todos with user authentication.

## Overview

This project is a simple API built with Node.js, Express, and MongoDB. It includes basic user authentication and CRUD operations for todo items.

## Setup

1. **Install dependencies:**

   Ensure you have Node.js and npm installed on your machine. Then, in the root directory of the project, run:

   ```bash
   npm install
   ```

   This will install all the necessary packages listed in `package.json`.

2. **Configure environment variables:**

   Create a `.env` file in the root directory. This file should contain the necessary environment variables for the project. Here is an example of what might be included:

   ```plaintext
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Replace the placeholder values with your actual configuration details.

3. **Run the project:**

   - **For development:**

     Use the following command to start the development server with hot-reloading:

     ```bash
     npm run dev
     ```

     This will use `nodemon` to automatically restart the server when file changes are detected.

   - **For production:**

     To run the project in a production environment, use:

     ```bash
     npm start
     ```

     This will start the server using `node`, without hot-reloading.

4. **Access the API:**

   Once the server is running, you can access the API at `http://localhost:3000` (or the port you specified in the `.env` file).

5. **Testing:**

   If you have tests set up, you can run them using:

   ```bash
   npm test
   ```

   Ensure all tests pass before deploying to production.

## API Endpoints

- **Authentication:**

  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/login` - Login a user
  - `POST /api/auth/logout` - Logout a user
  - `POST /api/auth/change-password` - Change user password
  - `GET /api/auth/check-auth` - Check user authentication status

- **Todos:**
  - `GET /api/todos` - Get all todos
  - `GET /api/todo/:id` - Get a single todo
  - `POST /api/add-todo` - Create a new todo
  - `PUT /api/update-todo/:id` - Update a todo
  - `DELETE /api/delete-todo/:id` - Delete a todo

## License

This project is for personal use only. All rights reserved.

## Contact

For questions or feedback, please contact [chanbangay@gmail.com](mailto:chanbangay@gmail.com).
