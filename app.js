var express = require('express'),
    everyauth = require('everyauth'),
	question = require('./private/APIs/questionAPI');
	user = require('./private/APIs/userAPI'),
	util = require('util'),
	app = express.createServer();

require('./private/everyauth/Twitter');

// Express configurations
app.configure(function () {
	app.set('views', __dirname + '/private/views');
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

require('./private/routes/routes')(app, question);

app.listen(process.env.PORT || 4000);

// Start a REPL for debugging
// require('repl').start('> ').context.everyauth = everyauth;