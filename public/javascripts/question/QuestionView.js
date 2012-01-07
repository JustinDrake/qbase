define(['underscore', 'backbone', 'text!question/questionTemplate.html', 'timeago'], function (_, Backbone, questionTemplate) {
	var QuestionView = Backbone.View.extend({
		initialize: function () {
			this.model.bind('destroy', this.destroySelf, this);
			this.model.bind('change:upVotes', this.refreshVotes, this);
			this.model.bind('change:downVotes', this.refreshVotes, this);
			this.render();
			this.delegateEvents();
		},
		events: {
			'click .remove': 'destroyModel',
			'click .upvote': 'upvote',
			'click .downvote': 'downvote'
		},
		render: function () {
			return this.el = $(this.template(this.model.toJSON()));
		},
		refreshVotes: function () {
			// Refresh the difference in votes
			this.el.find('.votes').text(this.model.get('upVotes') - this.model.get('downVotes'));

			// Reset the votes
			this.el.find('.upvote, .downvote').css('color', 'white');

			var userVote = this.model.get('userVote');
			console.log('userVote:', userVote);

			if (userVote === -1) {
				this.el.find('.downvote').css('color', 'red');
			} else if (userVote === 1) {
				this.el.find('.upvote').css('color', 'lime');
			}
		},
		destroyModel: function () {
			this.model.destroy();
		},
		destroySelf: function () {
			var $el = this.el;

			$el.fadeTo(200, 0.2, function () {
				$el.children().slideUp(200, function () {
					$el.remove();
				});
			});
		},
		upvote: function () {
			var newUpVotes = this.model.get('upVotes') + 1;

			console.log('Inside upvote');
			this.model.set({
				userVote : 1,
				upVotes : newUpVotes
			});

			console.log('userVote:', this.model.get('userVote'));
			this.model.save();
		},
		template: _.template(questionTemplate),
		downvote: function () {
			var newDownVotes = this.model.get('downVotes') + 1;

			this.model.set({
				userVote: -1,
				downVotes : newDownVotes
			});

			this.model.save();
		}
	});

	return QuestionView;
});