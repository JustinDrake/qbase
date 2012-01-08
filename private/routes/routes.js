module.exports = function (app, question) {
	function sendOK(response) {
		response.send();
	}

// MAIN

	app.get('/', function (request, response) {
		response.render('main');
	});

// QUESTIONS

	app.get('/questions', function (request, response) {
		question.latest(request.session.auth ? request.session.auth.twitter.user.id : undefined, 5, function (questions) {
			response.send(questions);
		});
	});

	app.post('/questions', function (request, response) {
		question.add(request, function (question) {
			response.send(question);
		});
	});

	app.delete('/questions/:id', function (request, response) {
		question.remove(request.params.id, sendOK(response));
	});

	app.put('/questions/:id', function (request, response) {
		question.save(request.body, sendOK(response));
	});

// SEARCH

	app.get('/search', function (request, response) {
		for(var a in request.query) {
			question.search(a, function (documents) {
				response.send(documents);
			});
		}
	});

// USER

	app.get('/user', function (request, response) {
		if (request.session.auth && request.session.auth.loggedIn === true) {
			response.json({
				name: request.session.auth.twitter.user.name,
				_id: request.session.auth.twitter.user.id
			});
		} else {
			response.json(undefined);
		}
	});
}