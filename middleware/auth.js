// functions/middleware/auth.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var config = global.config;

const User = mongoose.model('User');
const Profile = mongoose.model('Profile');

module.exports = function(req, res, next) {
    var response = res;
    if(req.query.token) req.body.token = req.query.token;
    if(!req.body.token) return res.status(400).send('Missing token');
    jwt.verify(req.body.token, config.secret, function(err, decoded) {
        if(err) return res.status(400).send(err);
        if(!decoded.email) return res.status(400).send('Unable to verify user, returning to sign in');
        User.findOne({email: decoded.email})
            .populate('active_profile')
            .exec(function(err, user) {
                if(err) res.send(err);
                Profile.find({parent: user._id}, (err, profiles) => {
                    if(err) res.send(err);
                    req.user = user;
                    req.user.profiles = profiles;
                    next();
                })
            });
    })
}