
// LocalStrategy is used to authenticate the username and password
// after the authentication process runs (failure or success)... "done" is returned
// if failure, "done" returns the error, if success, "done" returns a user object
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { serializeUser } = require('passport');


// Load User model
const User = require('../modules/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        })
    );

    // serializeUser is used to indicate which data of user object will be stored in the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // the first argument is the key to the user object 
    // this key will identify the user object
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};