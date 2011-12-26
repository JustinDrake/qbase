define(['underscore', 'backbone', 'QuestionModel', 'QuestionView'],

	function (_, Backbone, QuestionModel, QuestionView) {
		var QuestionList = Backbone.Collection.extend({
			model: QuestionModel,
			url: '/questions'
		});

		var questionList = new QuestionList();

		questionList
			.bind('add', function (model) {
				new QuestionView({
					collection: questionList, model: model.toJSON()
				}).render();
			})
			.fetch({
				error: function (collection, response) {
					console.error('Error in fetching the questions!', response);
				},
				success: function (collection, response) {
					collection.add(response);
				}
			});

		return questionList;
	}
);