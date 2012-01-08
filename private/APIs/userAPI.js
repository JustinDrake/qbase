var mongoose = require('./../mongo/mongoConnection');
var User = require('./../schemas/UserSchema');

function findOrCreateFromTwitterData(twitterData, promise, session) {
	User.find({
		twitterId: twitterData.id
	}, function (error, document) {
		if (error) {
			console.error('Error in finding user with this ID!');
		} else {
			if (document.length) {
				promise.fulfill({
					user: document,
					message: 'User exists, welcome!'
				});
			} else {
				var newUser = new User({
					twitterId: twitterData.id,
					username: twitterData.name
				}).save(function (error) {
					if (error) {
						console.error('Error in saving the new user!');
					} else {
						promise.fulfill({
							user: newUser,
							message: 'User created, welcome!'
						});
					}
				});
			}
		}
	});
}

function getIP(request) {
	return request.connection.remoteAddress;
}

module.exports = {
	findOrCreateFromTwitterData: findOrCreateFromTwitterData
}