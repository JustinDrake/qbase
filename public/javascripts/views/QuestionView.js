define(['underscore', 'backbone', 'text!templates/questionTemplate.html', 'userModel', 'timeago'], function (_, Backbone, questionTemplate, userModel) {
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
			'click .downvote': 'downvote',
			'click .tags': 'searchByTag'
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
			var userId = userModel.get('_id');

			// Only consider votes from logged in users
			if (userId) {
				// Only change the votes if has not already voted
				if (_.indexOf(this.model.get('upVoters'), userId) === -1) {
					this.model.get('upVoters').push(userId);

					this.model.set({
						userVote: 1,
						upVotes: this.model.get('upVotes') + ((_.indexOf(this.model.get('downVoters'), userId) === -1) ? 1 : 2),
						downVoters: _.without(this.model.get('downVoters'), userId)
					});

					this.model.save();
				} else {
					console.info('Question already upvoted!');
				}
			} else {
				this.highlightLogin();
			}
		},
		template: _.template(questionTemplate),
		downvote: function () {
			var userId = userModel.get('_id');

			// Only consider votes from logged in users
			if (userId) {
				// Only change the votes if has not already voted
				if (_.indexOf(this.model.get('downVoters'), userId) === -1) {
					this.model.get('downVoters').push(userId);

					this.model.set({
						userVote: -1,
						downVotes: this.model.get('downVotes') + ((_.indexOf(this.model.get('upVoters'), userId) === -1) ? 1 : 2),
						upVoters: _.without(this.model.get('upVoters'), userId)
					});

					this.model.save();
				} else {
					console.info('Question already downvoted!');
				}
			} else {
				this.highlightLogin();
			}
		},
		highlightLogin: function () {
			$('#login')
				.children()
				.css('color', 'red');
		},
		searchByTag: function (event) {
			$('#showsearch')
				.click();

			$('#searchinput')
				.val($(event.target).text());

			$('#searchbutton')
				.click();
		}
	});

	return QuestionView;
});