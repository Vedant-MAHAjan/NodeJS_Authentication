# Node_Authentication
Login and Register functionality using Node.js, Express.js and MongoDB

## The app uses...
express for routing, 
express-ejs-layout for views, 
express-session for server sessions, 
bcryptJS for password protection in MongoDB, 
connect-flash for displaying flash messages, 
passport for login and register, 

Passport is a middleware used for Authentication in Node.js. It is easy to use and very flexible with any code base.

MongoDB has many inbuilt methods for basic functions of login and passport protection. A database schema is declared inside User.js file.
"Mongoose" acts a frontend for MongoDB applications. A database model is created using the schema.

Passport provides many different functions like storing hashed passwords. These hash passwords are then compared with the entered password and the user is authenticated. 
"passport-local" provides authentication using local database. Alternatively, Google, Facebook login can also be used to authenticate using relevant packages like
"passport-google" or "passport-facebook".

After each successful login attempt, the session ID for the user is created and all further communication with the server is done by using that session ID. 
The "passport.authenticate()" is used for the "login" route to make it password protected. 

