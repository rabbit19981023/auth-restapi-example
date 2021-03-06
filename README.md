# auth-restapi-example

This is a role-based Auth, implemented in Passport.js. It's a RESTful API version.

## Technologies

- Architecture : MVC-like, RESTful API

- Language : Node.js, Typescript

- Database : MongoDB Atlas (host on cloud)

- third-party library : Passport.js

## Usage

1. set environment variables in `.env` file:

    ```.env
    PORT=<port>
    MONGODB_URI=<your-mongodb-uri>
    SESSION_SECRET=<your-session-secret>
    ```

2. install all dependencies version-locked:

    ```bash
    $ npm ci
    ```

3. build the project (compile all `.ts` files into `.js` files):

    ```bash
    $ npm run build
    ```

4. install all dependencies version-locked which are only needed in runtime:

    ```bash
    $ npm ci --production
    ```

5. run the server:

    ```bash
    $ npm run start
    ```

## Send requests to server

1. Get all users:

    ```bash
    $ curl --request GET http://localhost:<port>/users


    {"status":"ok","users":[{"role":"user","username":"admin_username"}]}
    ````

2. Register a new user:

    ```bash
    $ curl --request POST --data "username=admin_username&password=admin_password" http://localhost:<port>/users/register

    {"status":"ok","username":"admin_username"}
    ```

3. Login:

    ```bash
    $ curl --request POST --data "username=admin_username&password=admin_password" http://localhost:<port>/users/login

    {"status":"ok","username":"admin_username"}
    ```
