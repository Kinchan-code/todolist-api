# TodoList API

A personal project for managing todos with user authentication.

## Overview

This project is a simple API built with Node.js, Express, and MongoDB. It includes basic user authentication and CRUD operations for todo items.

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env` file in the root directory with the necessary environment variables.

3. **Run the project:**

   For development:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

## License

This project is for personal use only. All rights reserved.# TodoList API

A personal project for managing todos with user authentication.

## Overview

This project is a simple API built with Node.js, Express, and MongoDB. It includes basic user authentication and CRUD operations for todo items.

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env` file in the root directory with the necessary environment variables.

3. **Run the project:**

   For development:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

- **API Endpoints:**

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
