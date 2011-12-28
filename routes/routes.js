module.exports = function (app, question) {

	app.get('/', function (request, response) {
		response.render('main');
	});

	app.get('/questions', function (request, response) {
		question.latest(15, function (questions) {
			console.log('Sending response');
			response.send(questions);
		});
	});

	app.post('/questions', function (request, response) {
		question.add(request.body, function () {
			response.send();
		});
	});

	app.delete('/questions/:id', function (request, response) {
		question.remove(request.params.id, function () {
			response.send();			
		});
	})
}