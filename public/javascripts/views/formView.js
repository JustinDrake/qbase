define(
	['underscore', 'backbone', 'QuestionModel', 'QuestionView', 'questionList', 'autocomplete', 'userModel'],

	function (_, Backbone, QuestionModel, QuestionView, questionList) {
		var FormView = Backbone.View.extend({
			el: '#formview',
			events: {
				'click #addbutton': 'addQuestion',
				'click #cancelbutton': 'toggle',
			},
			initialize: function () {
				_.bindAll(this, 'addQuestion');

				$('#articleinput')
					.autocomplete({
						source: function(request, response) {
							$.ajax({
								url: 'https://en.wikipedia.org/w/api.php?action=opensearch&namespace=0&limit=5&search=' + request.term + '&callback=?',
								dataType: 'jsonp',
								success: function(data) {
									response(data[1]);
								}
							});
						}
					});
			},
			addQuestion: function () {
				var $el = $(this.el);

				var newQuestion = questionList.create({
					text: $el.find('#textinput').val() === '' ? undefined : $el.find('#textinput').val(),
					answer: $el.find('#answerinput').val() === '' ? undefined : $el.find('#answerinput').val(),
					wrongAnswers: $el.find('#wronganswersinput').val() === '' ? undefined : $el.find('#wronganswersinput').val().split(';'),
					tags: $el.find('#tagsinput').val() === '' ? undefined : $el.find('#articleinput').val().split(';'),
					date: new Date().toISOString() // WARNING -> toISOString is not implemented in all browsers
				}, {
					error: function (collection, response) {
						console.error('Did not create the question!', response);
					}
				});

				this.clearEntries();
			},
			clearEntries: function () {
				$(this.el)
					.find(':text')
					.val('');
			},
			toggle: function () {
				$('#showform').click();
			},
			show: function () {
				$(this.el).show(300);
			}
		});

		var formView = new FormView();

		return formView;
	});
