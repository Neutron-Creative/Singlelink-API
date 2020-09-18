// Third-party assets & dependancies
var express = require('express');
var mongoose = require('mongoose');

var ProfileController = express();

// Routing
//ProfileController.all('/', require('./'));

ProfileController.post('/fetch', require('./fetch'));

ProfileController.all('/thumbnail/:handle', require('./thumbnail'));

// From here on out, require authentication
ProfileController.use(require('../../middleware/auth'));

ProfileController.post('/create', require('./create'));

ProfileController.post('/fetch-preview', require('./fetch-preview'));

ProfileController.post('/activate-theme', require('./activate-theme'));

ProfileController.post('/update', require('./update'));

ProfileController.post('/links', require('./links'));

ProfileController.post('/list', require('./list'));

ProfileController.post('/destroy', require('./destroy'));

module.exports = ProfileController;
