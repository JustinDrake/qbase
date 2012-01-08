var mongoose = require('./../mongo/mongoConnection');

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

module.exports = Question;