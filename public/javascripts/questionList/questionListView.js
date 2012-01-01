define(['underscore', 'backbone', 'questionList', 'QuestionView'],
	function (_, Backbone, questionList, QuestionView) {
		var QuestionListView = Backbone.View.extend({
			initialize: function () {
				this.collection.bind('add', this.addView, this);
				this.collection.bind('reset', this.reset, this);
				this.collection.bind('all', function (event) {
					console.log(event);
				});

				$(this.el).on('mouseover', '.question', function () {
					$(this)
						.find('.upvote, .downvote, .remove')
						.css('visibility', 'visible');
				});

				$(this.el).on('mouseout', '.question', function () {
					$(this)
						.find('.upvote, .downvote, .remove')
						.css('visibility', 'hidden');
				});
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
			},
			reset: function () {
				$(this.el).empty();
				for(var a in this.collection.models) {
					this.addView(this.collection.models[a]);
				}
			}
		});

		var questionListView = new QuestionListView({
			collection: questionList
		});

		return questionListView;
	}
);