define(['underscore', 'backbone', 'questionList', 'QuestionView'],
	function (_, Backbone, questionList, QuestionView) {
		var QuestionListView = Backbone.View.extend({
			initialize: function () {
				this.collection.bind('add', this.addView, this);
				this.collection.bind('remove', this.removeView, this);
			},
			el: '#questioncontainer',
			addView: function (model) {
				var questionView = new QuestionView({
					model: model
				});

				questionView.el
					.hide();

				$(function () {
					questionView
						.prependTo(this.el)
						.fadeIn();						
				});

				$('.timeago').timeago();
			},
			removeView: function (model, collection) {
				console.log('View removed from collection');
			}
		});

		var questionListView = new QuestionListView({
			collection: questionList
		});

		return questionListView;
	}
);