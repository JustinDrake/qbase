define(['underscore', 'backbone'], function (_, Backbone) {
	var QuestionModel = Backbone.Model.extend({
		defaults: {
			answer: '',
			text: '',
			author: 'Anonymous',
			date: +(new Date()),
			downVotes: 0,
			downVoters: [],
			upVotes: 0,
			upVoters: [],
			views: 1,
			tags: [],
			wrongAnswers: [],
			userVote: 0
		}
	});

	return QuestionModel;
});