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

This seed project includes the following:
- Express (to serve the application as an http server)
- AngularJS (Angular 1) with pre-built blog site as an example
- JQuery
- Bootstrap
- MomentJS
- Grunt
   - jshint
   - uglify
   - less
   - cssmin
   - watch (to compile less and livereload frontend files)
   - express-server (to run the express server with Grunt)

This seed project is fully setup with the backend service, API, and client-side
Angular app and is built out as a basic blog site to provide an example of use.
For the seed with the blog example, use the master branch of this repository.
If you wish to start without the blog example, use the NoExample branch of
this repository.

### Setup Instructions
1. Make sure NodeJS is installed.
2. Open up a CMD(or terminal) window in the directory of this application.
3. Install the needed dependencies.
   1. Run `npm install`.
   2. In order to run the app in the suggested way, install grunt globally with `npm install -g grunt`
4. Setup the ApiConfig for your database.
   1. Open up ApiConfig.json at the root of the application.
   2. Set the 'database_url' field to the URL of your hosted MongoDB database.
   3. Note: If you wish to use a different database, you will have to build that
      into the application yourself.
4. There are three ways to start the application:
   1. The suggested way: Run `grunt serve`. This will start the web server and several
      grunt watch tasks to automatically compile less and livereload front-end files.
         - Running `grunt serve-b` will start the same as `grunt serve`, but will
           also open up your default browser to the application.
   2. If you don't want all the features of grunt but still want a bit more than
      a basic express server, run `npm run dev`. This will start nodemon. Nodemon
      will start the web server and restart it whenever a file change is detected.
   3. Lastly, to simply start the web server, run `npm start` or `node server.js`.
5. To view the application, visit [http://localhost:3000](http://localhost:3000) in a browser.
