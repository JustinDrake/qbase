define(['underscore', 'backbone', 'text!question/questionTemplate.html', 'timeago'], function (_, Backbone, questionTemplate) {
	var QuestionView = Backbone.View.extend({
		initialize: function () {
			this.model.bind('destroy', this.destroySelf, this);
			this.model.bind('change:upVotes', this.refreshVotes, this);
			this.render();
			this.delegateEvents();
		},
		events: {
			'click .remove': 'destroyModel',
			'click .upvote': 'upvote'
		},
		render: function () {
			console.log('Rendering view');
			return this.el = $(this.template(this.model.toJSON()));
		},
		refreshVotes: function () {
			this.el.find('.votes').text(this.model.get('upVotes') - this.model.get('downVotes'));
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
			this.model.set({
				upVotes : newUpVotes
			});

			this.model.save(['upVotes']);
		},
		template: _.template(questionTemplate)
	});

	return QuestionView;
});