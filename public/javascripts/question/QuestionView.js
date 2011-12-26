define(['underscore', 'backbone', 'text!question/questionTemplate.html', 'timeago'], function (_, Backbone, questionTemplate) {
	var QuestionView = Backbone.View.extend({
		el: '#questioncontainer',
		events: {
		//	'click #upvote': 'upVote',
		//	'click #downvote': 'downVote'
		},
		initialize: function () {
			$(this.el)
				.on('dblclick', '.text', function () {
					$(this).attr('contentEditable', true);
				})
				.on('blur', '.text', function () {
					$(this).attr('contentEditable', false);
				})

		//	this.model.bind('change:text', this.changeText)
		},
		render: function () {
			var $newQuestion = $(this.questionTemplate(this.options.model))
				.hide()
				.prependTo($('#questioncontainer'))
				.fadeIn();

			$('.timeago').timeago();
		},
		upvote: function () {
			
		},
		changeText: function () {
			console.log('The text has changed!')
		},
		questionTemplate: _.template(questionTemplate)
	});

	return QuestionView;
});