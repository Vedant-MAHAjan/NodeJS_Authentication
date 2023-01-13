const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

// Landing Page
router.get('/', (req, res) => {
    res.render('welcome')
})

// Dashboard Page
// ensureAuthenticated is used to protect a route
// this route (dashboard) is password protected 
// user is the inbuilt property
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name
    })
})

module.exports = router;

