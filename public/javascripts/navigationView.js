define(['underscore', 'backbone', 'formView', 'searchView', 'userModel', 'questionList'], function (_, Backbone, formView, searchView, userModel, questionList) {
	var NavigationView = Backbone.View.extend({
		el: '#navigation',
		events: {
			'click #showform': 'showForm',
			'click #showsearch': 'showSearch',
			'click #mainlink': 'refreshContent'
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
			$(formView.el).show()
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
					}
				},
				error: function () {
					console.error('Error in getting the user information');
				}
			});
		},
		refreshContent: function () {
			questionList.populate();
		}
	});

	var navigationView = new NavigationView();

	return navigationView;
});