var everyauth = require('everyauth'),
	Promise = everyauth.Promise,
	user = require('./../APIs/userAPI');

everyauth
	.twitter
	.consumerKey('JPKjV09pV05ShPYN1NUnhw')
	.consumerSecret('y3i12vM6BYyAg4cdMfnWsB7EPZdZU1h8RE6bXZvcCM')
	.findOrCreateUser(function (session, accessToken, accessTokenSecret, twitterUserData) {
		var promise = new Promise();

		user.findOrCreateFromTwitterData(twitterUserData, promise, session);
		return promise;
	})
	.redirectPath('/')
	.handleLogout(function (request, response) {
		request.logout();
		response.json('Logout successful');
	});