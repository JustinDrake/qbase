define(['underscore', 'backbone', 'text!question/questionTemplate.html', 'timeago'], function (_, Backbone, questionTemplate) {
	var QuestionView = Backbone.View.extend({
		initialize: function () {
			this.model.bind('destroy', this.destroySelf, this);
			this.render();
			this.delegateEvents();
		},
		events: {
			'click .remove': 'destroyModel'
		},
		render: function () {
			this.el = $(this.template(this.options.model.toJSON()));
		},
		destroyModel: function () {
			this.model.destroy();
		},
		destroySelf: function () {
			this.el.fadeTo(300, 0, function () {
				$(this).remove();
			});
		},
		template: _.template(questionTemplate)
	});

	return QuestionView;
});