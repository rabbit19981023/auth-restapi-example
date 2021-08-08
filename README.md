# auth-restapi-example

This is a role-based Auth, implemented by Passport.js. It's a RESTful API version.

## Technologies

- Language : Typescript
- Architecture : MVC-like, RESTful API
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

3. compile all the typescript source files into javascript codes:

   ```bash
   $ npm run build
   ```

4. remove all unnecessary devDependencies, leave dependencies only needed in runtime:

   ```bash
   $ npm ci --production
   ```

5. run the server:

   ```bash
   $ npm run start
   ```

## Send requests to server

1. Sign Up a new user:

   ```bash
   $ curl --request POST --data "username=<username>&password=<password>" http://localhost:<port>/auth/sign-up
   ```

2. Login:

   ```bash
   $ curl --request POST --data "username=<username>&password=<password>" http://localhost:<port>/auth/login
   ```



