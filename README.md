
# MediaPulse-backend

**MediaPulse-backend** is a social media backend application built using Node.js and Express. It provides a range of functionalities for user management and post handling, allowing you to create, update, and interact with posts and user profiles.

<p align="center">
  <img src="https://github.com/mongodb-js/leaf/blob/master/dist/mongodb-leaf_128x128.png" alt="MongoDB" width="150"/>
  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/jsonwebtokens.svg" alt="JWT" width="150"/>
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="200"/>
</p>

## Endpoints

### User Management

- **POST** `/users/signupUser`
  - **Description**: Sign up a new user.
- **POST** `/users/loginUser`
  - **Description**: Log in an existing user.
- **POST** `/users/logoutUser`
  - **Description**: Log out the current user.
- **POST** `/users/followUser`
  - **Description**: Follow a user.
- **PUT** `/users/updateUser`
  - **Description**: Update user details.
- **GET** `/users/getUserProfile`
  - **Description**: Retrieve the profile of the current user.

### Post Management

- **POST** `/posts/create`
  - **Description**: Create a new post.
- **GET** `/posts/:postId`
  - **Description**: Get a specific post by ID.
- **DELETE** `/posts/delete/:postId`
  - **Description**: Delete a specific post by ID.
- **POST** `/posts/like/:id`
  - **Description**: Like a specific post by ID.
- **POST** `/posts/reply/:id`
  - **Description**: Reply to a specific post by ID.
- **GET** `/posts/getFeeds`
  - **Description**: Retrieve the feed of posts.

## Environment Variables

The application uses the following environment variables, which need to be configured in a `.env` file:

- `PORT=`: Port number on which the server will run.
- `MONGO_URI=`: MongoDB connection URI.
- `JWT_SECRET=`: Secret key for JWT authentication.


# User Management Tests

## Test Files

### `Signup.test.js`

- **Description**: Tests the signup functionality of the application. It includes tests for both valid and invalid signup attempts. The goal is to verify that the application handles user registrations correctly and returns the appropriate status codes for different scenarios.
  
- **Tests Included**:
  - **Invalid Signup**: Submits a signup request with incorrect or incomplete credentials and expects a `400 Bad Request` response.
  - **Valid Signup**: Submits a signup request with valid credentials and expects a `201 Created` response.

### `Login.test.js`

- **Description**: Tests the login functionality of the application. It includes tests for both successful and unsuccessful login attempts. This ensures that the login process is secure and responds correctly to various input scenarios.
  
- **Tests Included**:
  - **Invalid Login**: Submits a login request with incorrect credentials and expects a `401 Unauthorized` response.
  - **Valid Login**: Submits a login request with correct credentials and expects a `200 OK` response with an appropriate authentication token or success message.

### `Logout.test.js`

- **Description**: Tests the logout functionality of the application. It ensures that the logout process correctly terminates the user's session and handles logout requests properly.
  
- **Tests Included**:
  - **Successful Logout**: Submits a logout request and expects a `200 OK` response. Verifies that the user session is invalidated and no further requests can be made with the same session.

## Test Notes

- **Testing Framework**: Jest
  - **Purpose**: Jest is used as the test runner and assertion library. It provides a comprehensive framework for writing, running, and managing tests with built-in support for assertions and mocking.

- **HTTP Assertions**: Supertest
  - **Purpose**: Supertest is used to make HTTP requests to the application and assert the responses. It is ideal for testing RESTful APIs by simulating real-world interactions and checking how the server responds to different types of requests.

## Setup and Running Tests

1. **Install Dependencies**:
   Ensure that all necessary dependencies are installed. You can use the following command to install them:
   ```bash
   npm install
   ```

2. **Run Tests**:
   To execute the tests, use the following command:
   ```bash
   npm test
   ```
   This will run all the test files and display the results in the terminal.

3. **Configuration**:
   Make sure that the application server is not running on the same port as specified in the test configuration (default port: `3001`). If needed, adjust the port settings in the test files and environment variables.

## Troubleshooting

- **Port In Use**:
  If you encounter an `EADDRINUSE` error, it means that the port specified for the test server is already in use. Change the port in the test configuration to an available port and retry.

- **Asynchronous Operations**:
  Ensure that all asynchronous operations are properly handled. Use `async/await` syntax to manage asynchronous code and avoid issues with unhandled promises or open handles.

## Structure

Here is the structure of the project:

- **controllers/**
  - `postController.js`: Handles post-related operations.
  - `userController.js`: Manages user-related operations.
- **middlewares/**
  - `protectedRoute.js`: Middleware for JWT authentication protection.
- **models/**
  - **postModel.js**: Schema for posts.
  - **userModel.js**: Schema for users.
  - **connection/**
    - `connection.js`: Configures the database connection.
- **routes/**
  - `postRoutes.js`: Routes for post-related endpoints.
  - `userRoutes.js`: Routes for user-related endpoints.
- **utils/**
  - `generateAndSetCookies.js`: Utility for handling cookies.
- **.env**: Environment variables configuration file.
- **createStructure.js**: Script for creating initial project structure.
- **index.js**: Entry point for the application.

## Dependencies

The project depends on the following npm packages:

- `bcryptjs`: ^2.4.3 - Password hashing utility.
- `cookie-parser`: ^1.4.6 - Middleware for cookie handling.
- `dotenv`: ^16.4.5 - Loads environment variables from a `.env` file.
- `express`: ^4.19.2 - Web framework for Node.js.
- `jsonwebtoken`: ^9.0.2 - JSON Web Token utility.
- `mongoose`: ^8.5.4 - MongoDB object modeling tool.

## How to Use

To set up and run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Doguhannilt/MediaPulse-backend.git
   ```

2. Navigate into the project directory:
   ```bash
   cd MediaPulse-backend
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the necessary environment variables.

5. Start the application in development mode:
   ```bash
   npm run dev
   ```

Your backend server will now be up and running!

