// required so that user cannot view dashboard without logging in 
// ensureAuthenticated() is used for any route that needs to be protected
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Login required')
        res.redirect('/users/login')
    }
}