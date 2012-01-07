define(['underscore', 'backbone', 'text!question/questionTemplate.html', 'userModel', 'timeago'], function (_, Backbone, questionTemplate, userModel) {
	var QuestionView = Backbone.View.extend({
		initialize: function () {
			this.model.bind('destroy', this.destroySelf, this);
			this.model.bind('change:upVotes', this.refreshVotes, this);
			this.model.bind('change:downVotes', this.refreshVotes, this);
			this.render();
			this.refreshVotes();
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
			this.el.find('.upvote, .downvote').removeClass('upvoted downvoted');

			var userVote = this.model.get('userVote');
			console.log(userVote);

			if (userVote === -1) {
				this.el
					.find('.downvote')
					.addClass('downvoted');
			} else if (userVote === 1) {
				this.el
					.find('.upvote')
					.addClass('upvoted');
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
			var userId = userModel.get('_id');

			// Only consider votes from logged in users
			if (userId) {
				// Only change the votes if has not already voted
				if (_.indexOf(this.model.get('upVoters'), userId) === -1) {
					this.model.set({
						userVote : 1,
						upVotes : newUpVotes
					});

					this.model.set({
						userModel: this.model.get('upVoters').push(userId)
					});

					this.model.save();
				} else {
					console.info('You have already voted, gready person!');
					console.log(this.model.get('userVote'));
				}
			} else {
				console.info('Cannot vote, not logged in!');
			}
		},
		template: _.template(questionTemplate),
		downvote: function () {
			var newDownVotes = this.model.get('downVotes') + 1;
			var userId = userModel.get('_id');

			// Only consider votes from logged in users
			if (userId) {
				// Only change the votes if has not already voted
				if (_.indexOf(this.model.get('downVoters'), userId) === -1) {
					this.model.set({
						userVote : -1,
						downVotes : newDownVotes
					});

					this.model.set({
						userModel: this.model.get('downVoters').push(userId)
					});

					this.model.save();
				} else {
					console.info('You have already voted, gready person!');
					console.log(this.model.get('userVote'));
				}
			} else {
				console.info('Cannot vote, not logged in!');
			}
		}
	});

	return QuestionView;
});