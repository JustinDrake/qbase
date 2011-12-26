define(['jquery', 'underscore', 'backbone'], function ($, _. Backbone) {
	var AnswersView  = Backbone.View.extend({
		el: '.answersview'
		initialize: function () {
			
		},
		show: function () {
			$(this.el).show(300);
		},
		hide: function () {
			$(this.el).hide(300);
		}
		events: {
			'click .answer': 'mark'
		},
		mark: function () {
			console.log('Marking question!');
		}
	});

	return AnswersView;
});