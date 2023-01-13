const express = require('express');
const router = express.Router();
const becrypt = require('bcryptjs');
const passport = require('passport')

// mongoDB will access a model and then call methods on it like save, find, etc
// the model is created inside User.js and stored here in variable "User"
const User = require('../modules/User')

// if the request is get(), the data will be visible in the search bar (unprotected)
// get() is used to send smaller amount of data
// get() will render login page as response
router.get('/login', (req, res) => {
    res.render('login')
})

// get() will render the register page as response
router.get('/register', (req, res) => {
    res.render('register')
})


// Register handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body

    // errors[] will hold all the error messages
    // but since the messages need to be displayed on screen
    // they should be placed inside the view of the register
    // hence they are present in another folder called "partials" as the convention
    // the errors[] will be parsed inside the "messages.ejs" file and the errors will be displayed
    let errors = []

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill out all fields' })
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' })
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 characters long' })
    }

    // check if there are any errors
    // if yes, re-render the register form but will all the fields having the input values intact
    // when the register form re-renders name, email, etc will have all the values intact
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else {
        // findOne is a mongoose method which finds a record with a particular condition
        // here email should be same as email, it means user already exists in the db
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email already exists' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                }
                else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    //Hash password
                    // save will add the entry to mongodb atlas 
                    becrypt.genSalt(10, (err, salt) =>
                        becrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash;
                            newUser.save().then(user => {
                                req.flash('success_msg', 'You are now registered and can log in')
                                res.redirect('/users/login')
                            })
                                .catch(err => console.log(err))
                        }))
                }
            })
    }

    // console.log("Errors are ", errors);
    // console.log(req.body);
})


// login handle middleware
// once the login is successful, a "login session" is established
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})


// logout button 
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err) }
    });
    req.flash('success_msg', 'Logged out successfully')
    res.redirect('/users/login')
})

module.exports = router;