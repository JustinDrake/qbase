define(
	['underscore', 'backbone', 'formView', 'searchView', 'userModel', 'questionList'],

	function (_, Backbone, formView, searchView, userModel, questionList) {
		var NavigationView = Backbone.View.extend({
			el: '#navigation',
			events: {
				'click #showform': 'showForm',
				'click #showsearch': 'showSearch',
				'click #mainlink': 'refreshContent',
				'click #logout': 'logout'
			},
			initialize: function () {
				var self = this;
				$(function () {
					self.getUserInformation();
				});
			},
			showForm: function (event) {
				$('.active').removeClass('active');
				$(event.currentTarget).parent().addClass('active');
				$(formView.el).show();
				$(searchView.el).hide();
			},
			showSearch: function (event) {
				$('.active').removeClass('active');
				$(event.currentTarget).parent().addClass('active');			
				$(searchView.el).show();
				$(formView.el).hide();
			},
			getUserInformation: function () {
				$.ajax({
					url: '/user',
					type: 'GET',
					success: function (response) {
						if (response) {
							$('#username')
								.text('Welcome, ' + response.name);
								
							$('#login')
								.hide();

							$('#logout')
								.show();

							userModel.set({
								_id : response._id
							});
						} else {
							$('#username')
								.text('');

							$('#login')
								.show();

							$('#logout')
								.hide();
						}
					},
					error: function () {
						console.error('Error in getting the user information');
					}
				});
			},
			refreshContent: function () {
				questionList.populate();
			},
			logout: function () {
				var self = this;
				$.ajax({
					url: '/logout',
					type: 'GET',
					success: function() {
						self.refreshContent();
						self.getUserInformation();
					},
					error: function () {
						console.error('Errorr in logging out');
					}
				});
			}
		});

		var navigationView = new NavigationView();

		return navigationView;
	});