# User Login Application


This project is a full-fledged user authentication application built with both a user interface (front-end) and a data processing layer (back-end).

**Technologies Used**

* **Front-end:** React.js is used to create a dynamic and interactive user interface. Tailwind CSS provides pre-built utility classes for styling the application.
* **Back-end:** Node.js with Express is used to build the server-side logic and handle API requests.
* **Database:** MongoDB with Mongoose acts as the data storage solution, storing user information securely.
* **Authentication:** JSON Web Tokens (JWT) are used to securely authenticate users and manage access to resources.
* **Encryption:** bcrypt is employed to ensure safe storage of user passwords by hashing them before storing them in the database.

**Features**

* Users can register for an account and log in to the application.
* The application provides options for users to log out and change their passwords.

**Installation**

1. **Clone the Repository:**

   Use the following command to clone the project repository from GitHub:

   ```bash
   git clone https://github.com/Tusharknwl/userlogin.git
   ```

2. **Install Dependencies:**

   Navigate to the project directory (`userlogin`) and install the required dependencies:

   * **Client-side:**

     ```bash
     cd client
     npm install
     ```

   * **Server-side:**

     ```bash
     cd ../server
     npm install
     ```

3. **Set Up Environment Variables:**

   Create a file named `.env` in both the `client` and `server` directories. Inside these files, define the following environment variables:

     * **Client directory:**

       ```
       VITE_API_URL=<your_api_url>
       ```

       Replace `<your_api_url>` with the actual URL of your server API.

     * **Server directory:**

       ```
       PORT=8000
       MONGODB_URI=<your_mongodb_uri>
       CORS_ORIGIN=<your_cors_origin>
       ACCESS_TOKEN_SECRET=<your_access_token_secret>
       ACCESS_TOKEN_EXPIRES_IN=<your_access_token_expires_in>
       REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
       REFRESH_TOKEN_EXPIRES_IN=<your_refresh_token_expires_in>
       ```

       * Replace `PORT` with the desired port number on which the server will run (default: 8000).
       * Replace `<your_mongodb_uri>` with the connection string for your MongoDB database.
       * Replace `<your_cors_origin>` with the allowed origin for Cross-Origin Resource Sharing (CORS).
       * Replace `<your_access_token_secret>` with a strong secret key for generating access tokens.
       * Replace `<your_access_token_expires_in>` with the desired expiration time for access tokens (e.g., in seconds).
       * Replace `<your_refresh_token_secret>` with a strong secret key for generating refresh tokens.
       * Replace `<your_refresh_token_expires_in>` with the desired expiration time for refresh tokens (e.g., in seconds).

4. **Run the Application:**

   * **Start the Server:**

     ```bash
     cd server
     npm start
     ```

   * **Start the Client:**

     ```bash
     cd ../client
     npm start
     ```

**License**

This project is distributed under the MIT License, allowing for free use and modification with proper attribution.
