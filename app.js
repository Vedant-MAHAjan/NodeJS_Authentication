const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');

const app = express();

// passport config
require('./config/passport')(passport)

// DB config
const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Mongo db connected "))
    .catch(err => console.log(err));
// mongoose.set('strictQuery', true);
// mongoose.set('strictQuery', false);


// EJS is like a quick front-end for Node.js based apps
app.use(expressLayouts);
app.set('view engine', 'ejs');


// BodyParser used to parse incoming requests
app.use(express.urlencoded({ extended: false }))


// express session are used to store client information about client
// client is assigned an ID and all the requests are made from this ID
// information stored on the server is using this ID
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

// passport middleware used for auth in Node.js apps
// easy to use and flexible with any code base
app.use(passport.initialize());
app.use(passport.session());


// connect flash
// used to display flash messages
app.use(flash())


// global variables
// these can be used anywhere inside the app
// they are used as variables to store messages and then display them
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')
    next();
})

//ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App listening on port ${PORT}`)); 