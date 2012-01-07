define(['underscore', 'backbone'], function (_, Backbone) {
	var QuestionModel = Backbone.Model.extend({
		defaults: {
			answer: '',
			text: '',
			author: 'Anonymous',
			date: +(new Date()),
			downVotes: 0,
			upVotes: 0,
			views: 0,
			tags: [],
			wrongAnswers: [],
			userVote: 0
		}
	});

	return QuestionModel;
});