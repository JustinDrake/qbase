define(['underscore', 'backbone', 'formView', 'searchView'], function (_, Backbone, formView, searchView) {
	var NavigationView = Backbone.View.extend({
		el: '#navigation',
		events: {
			'click #showform': 'showForm',
			'click #showsearch': 'showSearch'
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
							.text('Welcome, ' + response);
							
						$('#login')
							.hide();

						$('#logout')
							.show();
					} else {
						console.log('No user connected!');
					}
				},
				error: function () {
					console.error('Error in getting the user information');
				}
			});
		}
	});

	var navigationView = new NavigationView();

	return navigationView;
});