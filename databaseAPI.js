var mongoose = require('mongoose').connect('mongodb://randomblue:camparifred@staff.mongohq.com:10006/app2220777/qbase'),
	Question = mongoose.model('questions', new mongoose.Schema({
		text : { type: String, default: '[The question goes here.]' },
		date : { type: Date, default: Date.now },
		answer : { type: String, default: '[The answer goes here.]' },
		wrongAnswers : { type: Array, default: [] },
		tags : { type: Array, default: [] },
		author : { type: String, default: 'Justin' },
		upVotes : { type: Number, default: 0 },
		downVotes : { type: Number, default: 0 },
		views : { type: Number, default: 0}
	}));

function add(question, next) {
	(new Question(question)).save(function (error) {
		if (error) {
			console.error('Error when adding a new question!', error);
		} else if (next) {
			next();
		}
	});
}

function remove(id) {
	Question.findById(id, function (error, document) {
		if (error) {
			console.error('Error when removing a question!');
		} else {
			console.log('Removed question ' + id);
		}
		document.remove()
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

function latest(limit, next) {
	limit = limit || 5;

	Question
		.find({})
		.sort('date', -1)
		.limit(limit)
		.exec(function (error, documents) {
			if (error) {
				console.error('Error in getting the latest questions');
			}
			next(documents);
		});
}

function update(id, attribute, value) {}

module.exports = {
	add: add,
	remove: remove,
	modify: modify,
	latest: latest
}