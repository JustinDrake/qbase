module.exports = function (app, question) {

	app.get('/', function (request, response) {
		response.render('main');
	});

	app.get('/questions', function (request, response) {
		question.latest(15, function (questions) {
			response.send(questions);
		});
	});

	app.post('/questions', function (request, response) {
		question.add(request.body, function () {
			response.send();
		});
	});
}