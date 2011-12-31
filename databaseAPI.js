//var mongoose = require('mongoose').connect('mongodb://localhost/qbase'),
var mongoose = require('mongoose').connect('mongodb://justin:camparifred@staff.mongohq.com:10006/app2220777'),
	Question = mongoose.model('questions', new mongoose.Schema({
		text : { type: String, default: '[The question goes here.]' },
		date : { type: Date, default: Date.now },
		answer : { type: String, default: '[The answer goes here.]' },
		wrongAnswers : { type: Array, default: [] },
		tags : { type: Array, default: [] },
		author : { type: String, default: 'Anonymous' },
		upVotes : { type: Number, default: 0 },
		downVotes : { type: Number, default: 0 },
		views : { type: Number, default: 1}
	}));

function getIP(request) {
	return request.connection.remoteAddress;
}

function add(request, next) {
	var question = request.body;

	question.author = getIP(request);

	(new Question(question)).save(function (error) {
		if (error) {
			console.error('Error when adding a new question.', error);
		} else if (next) {
			next();
		}
	});
}

function remove(id, next) {
	Question
		.findById(id, function (error, document) {
			if (error) {
				console.error('Error when removing a question.');
			} else {
				if(next) {
					next();
				}
			}
			document.remove()
		});
}

function latest(limit, next) {

	Question
		.find({})
		.sort('date', -1)
		.limit(limit)
		.exec(
			function (error, documents) {
				if (error) {
					console.error('Error in getting the latest questions.', error);
				} else {

					// Bump the view count of all requested documents
					Question.update(documents, {
						$inc: { views: 1 }
					}, {
						multi: true
					}, function (error) {
						if (error) {
							console.error('Error in updating the views.', error)
						} else {
							if (next) {
								next(documents);						
							}
						}
					});
				}
			}
		);
}

function incrementViewCount(id, next) {
	Question
		.findById(id, function (error, document) {
			if (error) {
				console.error('Error when incrementing view count.');
			} else {
				document
					.update({
						$inc: {views: +1}
					});

				if (next) {
					next();
				}
			}
		});
}

function upvote(id, next) {
	Question
		.findById(id, function (error, document) {
			if (error) {
				console.error('Error when + voting.');
			} else {
				document
					.update({
						$inc: {upvote: 1}
					});

				if (next) {
					next();
				}
			}
		});
}

function downvote(id, next) {
	Question
		.findById(id, function (error, document) {
			if (error) {
				console.error('Error when - voting.');
			} else {
				document
					.update({
						$inc: {upvote: -1}
					});

				if (next) {
					next();
				}
			}
		});
}

function modify(question) {
	Question.findById(question._id, function (error, document) {
		if (error) {
			console.error('Error when modifying the question!');
		}
		if (!document) {
			console.error('No document to update!');
		} else {
			document.modified = new Date();

			for(attribute in question) {
				document[attribute] = question[attribute];
			}

			document.save(function (error) {
				if (error) {
					console.error('Error saving the new attribute!');
				}
			});
		}
	});
}

module.exports = {
	add: add,
	remove: remove,
	modify: modify,
	latest: latest,
	incrementViewCount: incrementViewCount,
	upvote: upvote,
	downvote: downvote
}