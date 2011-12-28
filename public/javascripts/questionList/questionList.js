define(['underscore', 'backbone', 'QuestionModel', 'text!question/questionTemplate.html'],
	function (_, Backbone, QuestionModel, QuestionView) {

		var QuestionList = Backbone.Collection.extend({
			model: QuestionModel,
			url: '/questions',
			initialize: function () {
				this.populate();
			},
			populate: function () {
				this.fetch({
					error: function (collection, response) {
						console.error('Error in fetching the questions!', response);
					},
					success: function (collection, response) {
						collection.add(_.sortBy(response, function (element) {
							return element.date;
						}));
					}
				});				
			}
		});

		return (new QuestionList());
	}
);