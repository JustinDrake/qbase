define(['underscore', 'backbone', 'questionList', 'QuestionView'],
	function (_, Backbone, questionList, QuestionView) {
		var QuestionListView = Backbone.View.extend({
			initialize: function () {
				this.collection.bind('add', this.addView, this);
			},
			el: '#questioncontainer',
			addView: function (model) {
				var questionView = new QuestionView({
					model: model
				});

				questionView.el
					.hide();

				// Saving a reference for scope reasons
				var element = this.el;

				$(function () {
					questionView.el
						.prependTo(element)
						.fadeIn();						
				});

				$('.timeago').timeago();
			}
		});

		var questionListView = new QuestionListView({
			collection: questionList
		});

		return questionListView;
	}
);