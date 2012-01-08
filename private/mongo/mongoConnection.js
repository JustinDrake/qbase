// This is a local database
// var mongoose = require('mongoose').connect('mongodb://localhost/qbase');

// This is a Heroku database
var mongoose = require('mongoose').connect('mongodb://justin:camparifred@staff.mongohq.com:10006/app2220777');

module.exports = mongoose;