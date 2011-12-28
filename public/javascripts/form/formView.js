define(['underscore', 'backbone', 'QuestionModel', 'QuestionView', 'questionList'],

function (_, Backbone, QuestionModel, QuestionView, questionList) {
	var FormView = Backbone.View.extend({
		el: '#formview',
		events: {
			'click #addbutton': 'addQuestion',
			'click #cancelbutton': 'hide',
		},
		initialize: function () {
			_.bindAll(this, 'addQuestion');
		},
		addQuestion: function () {
			var $el = $(this.el);

			console.log('Creating question...');
			var newQuestion = questionList.create({
				text: $el.find('#textinput').val() === '' ? undefined : $el.find('#textinput').val(),
				answer: $el.find('#answerinput').val() === '' ? undefined : $el.find('#answerinput').val(),
				wrongAnswers: $el.find('#wronganswersinput').val() === '' ? undefined : $el.find('#wronganswersinput').val().split(';'),
				tags: $el.find('#tagsinput').val() === '' ? undefined : $el.find('#tagsinput').val().split(';'),
				date: new Date().toISOString() // WARNING -> toISOString is not implemented in all browsers
			}, {
				error: function (collection, response) {
					console.error('Did not create the question!', response);
				}
			});
		},
		hide: function () {
			$(this.el).hide(300);
		},
		show: function () {
			console.log('Inside formView show');
			$(this.el).show(300);
		}
	});

	var formView = new FormView();

	return formView;	
});
