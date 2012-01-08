var mongoose = require('mongoose').connect('mongodb://localhost/qbase');
var mongoose = require('mongoose').connect('mongodb://justin:camparifred@staff.mongohq.com:10006/app2220777');
var _ = require('./underscore');

var Question = mongoose.model('questions_new',
	new mongoose.Schema({
		text : { type: String, default: '[The question goes here.]' },
		date : { type: Date, default: Date.now },
		answer : { type: String, default: '[The answer goes here.]' },
		wrongAnswers : { type: Array, default: [] },
		tags : { type: Array, default: [] },
		author : { type: String, default: 'Anonymous' },
		upVotes : { type: Number, default: 0 },
		upVoters : { type: Array, default: [] },
		downVotes : { type: Number, default: 0 },
		downVoters : { type: Array, default: [] },
		views : { type: Number, default: 1 },
		userVote : { type: Number, default: 0 }
	})
);

var User = mongoose.model('users',
	new mongoose.Schema({
		registrationDate : { type: Date, default: Date.now },
		username : { type: String, default: '[No username set!]' },
		twitterId : { type: Number, default: 0 }
	})
);

function findOrCreateFromTwitterData(twitterData, promise, session) {
	User.find({
		twitterId: twitterData.id
	}, function (error, document) {
		if (error) {
			console.error('Error in finding user with this ID!');
		} else {
			if (document.length) {
				promise.fulfill({
					user: document,
					message: 'User exists, welcome!'
				});
			} else {
				var newUser = new User({
					twitterId: twitterData.id,
					username: twitterData.name
				}).save(function (error) {
					if (error) {
						console.error('Error in saving the new user!');
					} else {
						promise.fulfill({
							user: newUser,
							message: 'User created, welcome!'
						});
					}
				});
			}
		}
	});
}

function getIP(request) {
	return request.connection.remoteAddress;
}

function add(request, next) {
	var question = request.body;
	console.log(request.session.auth);
	if (request.session.auth) {
		question.author = request.session.auth.twitter.user.name;
	} else {
		question.author = getIP(request);
	}

	var newQuestion = (new Question(question));

	newQuestion.save(function (error) {
		if (error) {
			console.error('Error when adding a new question.', error);
		} else if (next) {
			next(newQuestion);
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

function latest(userId, limit, next) {
	Question
		.find({})
		.sort('date', -1)
		.limit(limit)
		.exec(
			function (error, documents) {
				if (error) {
					console.error('Error in getting the latest questions.', error);
				} else {
					// Set `userVote` for UI info
					if(userId) {
						documents.forEach(function(document) {
							if(_.indexOf(document.upVoters, userId) !== -1) {
								document.userVote = 1;
							} else if(_.indexOf(document.downVoters, userId) !== -1) {
								document.userVote = -1;
							} else {
								document.userVote = 0;
							}
						});
					} else {
						documents.forEach(function(document) {
							document.userVote = 0;
						});
					}

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

function save(question) {
	Question.findById(question._id, function (error, document) {
		if (error) {
			console.error('Error when modifying the question!');
		}
		if (!document) {
			console.error('No document to update!');
		} else {
		//	The below line causes the app to crash on the server?!
		//	document.modified = new Date();

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

function search(query, next) {
	Question.find({
		tags: { $all: [query] }
	}, function (error, documents) {
		if (error) {
			return;
		}
		if (next) {
			next(documents);
		}
	});
}

module.exports = {
	add: add,
	remove: remove,
	save: save,
	latest: latest,
	incrementViewCount: incrementViewCount,
	upvote: upvote,
	downvote: downvote,
	search: search,
	findOrCreateFromTwitterData: findOrCreateFromTwitterData
}