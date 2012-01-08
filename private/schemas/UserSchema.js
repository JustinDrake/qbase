var mongoose = require('./../mongo/mongoConnection');

var User = mongoose.model('users',
	new mongoose.Schema({
		registrationDate : { type: Date, default: Date.now },
		username : { type: String, default: '[No username set!]' },
		twitterId : { type: Number, default: 0 }
	})
);

module.exports = User;