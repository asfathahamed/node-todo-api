var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");



// Register Router
router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, message: 'Either username or password empty.'});
    } else {
        var newUser = new User({
            username: req.body.uasername,
            password: req.body.password,
        });

        // save the user
        newUser.save(function (err) {
            if (err) return res.json({ success: false, message: 'Username already exists.'});
            res.json({ success: true, message: 'Success! created new user'});
        });
    }
});

// Login Router
router.post('/login', function(req, res) {
    if (!req.body) {
        res.send({success: false, message: 'Please enter username and password'});
    }
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, message: 'Authentication Failed! User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user found and correct password, create token
                    var token = jwt.sign(user.toJSON, config.secret);

                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token});
                } else {
                    res.json({ success: false, message: 'Authentication Failed! Invalid username or password'});
                }
            })
        }
    })
});

// Logout router
router.post('/logout', function(req, res) {
    req.logout();
    res.json({success: true})
});

module.exports = router;