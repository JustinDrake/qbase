define(['underscore', 'backbone'], function (_, Backbone) {
	var QuestionModel = Backbone.Model.extend({
		defaults: {
			answer: 'No answer',
			text: 'No question',
			author: 'No author',
			date: +(new Date()),
			downVotes: 0,
			upVotes: 0,
			views: 0,
			tags: ['Tag 1', 'Tag 2'],
			wrongAnswers: ['Wrong answer 1', 'Wrong answer 2']
		}
	});

	return QuestionModel;
});