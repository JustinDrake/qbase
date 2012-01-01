var express = require('express'),
//    everyauth = require('everyauth'),
	question = require('./databaseAPI'),
	util = require('util'),
	app = express.createServer();

// everyauth
// 	.twitter
// 	.consumerKey('adsf')
// 	.consumerSecret('asdf')
// 	.findOrCreateUser(function (session, accessToekn, accessTokenSecret, twitterUserData) {
// 		console.log(util.inspect(twitterUserData));
// 	});


// Express configurations
app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'Test'}));
	// app.use(everyauth.middleware());	
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));

	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

require('./routes/routes')(app, question);

app.listen(process.env.PORT || 3000);

// Start a REPL for debugging
// require('repl').start('> ').context.question = question;