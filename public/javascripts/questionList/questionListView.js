define(['underscore', 'backbone', 'questionList'], function (_, Backbone, questionList) {
	var QuestionListView = Backbone.View.extend({
		el: '#questioncontainer',
		events: {
			'click .question': 'showQuiz'
		},
		showQuiz: function () {
			this.
		}
	});

	var questionListView = new QuestionListView();

	return questionListView;
});