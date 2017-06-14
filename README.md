# Express & Angular Seed

### Description
This is a seed project built with Express and Angular 1. It contains two applications
built to be hosted as one.

The first part of the application is the Express backend and API. This handles
serving content and handles providing the API service. All requests to the toot
('/') URL will route to use the other half of the application's Angular routing.
Any request to '/api/<something else>' will route to the API REST service to handle
HTTP requests. The API is built to work with MongoDB. The included ApiConfig.json
is where you can specify your MongoDB connection settings. If you wish to use a
different DB service other than MongoDB, you will have to build that into the
application yourself.

The second part of the application is client-side Angular app. This is entirely
Angular and all routing apart from '/' and '/api/' is managed client-side with
Angular routing. This part of the application is where the app logic goes and where
views, etc will be created.

This seed application is fully setup with the backend service, API, and client-side
app and is built out as a basic blog site to provide an example of use.

### Setup Instructions
1. Make sure NodeJS is installed.
2. Open up a CMD(or terminal) window in the directory of this application.
3. Run `npm install`.
4. Setup the ApiConfig for your database.
   1. Open up ApiConfig.json at the root of the application.
   2. Set the 'database_url' field to the URL of your hosted MongoDB database.
   3. Note: If you wish to use a different database, you will have to build that
      into the application yourself.
4. There are two ways to start the application:
   1. Nodemon is installed, so if you want the server to restart after you save a change, run `npm run dev`.
   2. To start the application normally, run `node app.js`.
5. To view the application, visit [http://localhost:3000](http://localhost:3000) in a browser.
