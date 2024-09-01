
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

