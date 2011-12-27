define(['underscore', 'backbone', 'text!question/questionTemplate.html', 'timeago'], function (_, Backbone, questionTemplate) {
	var QuestionView = Backbone.View.extend({
		initialize: function () {
			this.model.bind('destroy', this.remove, this);
			this.render();
			this.delegateEvents();
		},
		events: {
			'click .remove': 'suicide'
		},
		render: function () {
			this.el = $(this.template(this.options.model.toJSON()));
		},
		suicide: function () {
			this.el.fadeTo(0.1);
			
			this.model.destroy({
				error: function () {
					this.el.fadeTo(1);
				}
			});
		},
		template: _.template(questionTemplate)
	});

	return QuestionView;
});