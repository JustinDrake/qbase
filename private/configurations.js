module.exports = function (app, express, everyauth) {
	app.configure(function () {
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.set('view options', {layout: false});
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.session({secret: 'This is only a test!'}));
		app.use(everyauth.middleware());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(__dirname + '/../public'));
		app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	});
}