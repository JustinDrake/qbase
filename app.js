var express = require('express'),
    everyauth = require('everyauth'),
	question = require('./private/APIs/questionAPI'),
	app = express.createServer();

require('./private/everyauth/Twitter');
require('./private/configurations')(app, express, everyauth);
require('./private/routes/routes')(app, question);

app.listen(process.env.PORT || 4000);

// Start a REPL for debugging
// require('repl').start('> ').context.everyauth = everyauth;