var express = require('express'),
	question = require('./databaseAPI'),
	app = express.createServer();
//	io = require('socket.io').listen(app); -> For later :)

// Express configurations
app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

// I put all my routing code here
require('./routes/routes')(app, question);

// We are now live!
app.listen(process.env.PORT || 3000);
console.log("Server up and running!");

// app.get('/socketio', function (request, response) {
// 	response.sendfile(__dirname + '/socketio.html');
// });

// io.sockets.on('connection', function (socket) {
// 	socket.emit('news', { hello: 'world'});
// 	socket.on('my other event', function (data) {
// 		console.log(data);
// 	});
// });

// Start a REPL for debugging
// require('repl').start('> ').context.question = question;