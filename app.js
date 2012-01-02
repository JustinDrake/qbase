var express = require('express'),
    everyauth = require('everyauth'),
	question = require('./databaseAPI'),
	util = require('util'),
	Promise = everyauth.Promise,
	app = express.createServer();

everyauth
	.twitter
	.consumerKey('JPKjV09pV05ShPYN1NUnhw')
	.consumerSecret('y3i12vM6BYyAg4cdMfnWsB7EPZdZU1h8RE6bXZvcCM')
	.findOrCreateUser(function (session, accessToken, accessTokenSecret, twitterUserData) {
		var promise = new Promise();
		console.log(util.inspect(twitterUserData));
		question.findOrCreateFromTwitterData(twitterUserData, promise);
		return promise;
	})
	.redirectPath('/');

// Express configurations
app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'This is only a test!'}));
	app.use(everyauth.middleware());	
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));

	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

require('./routes/routes')(app, question);

app.listen(process.env.PORT || 3000);

// Start a REPL for debugging
// require('repl').start('> ').context.question = question;