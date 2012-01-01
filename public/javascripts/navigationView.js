define(['underscore', 'backbone', 'formView', 'searchView'], function (_, Backbone, formView, searchView) {
	var NavigationView = Backbone.View.extend({
		el: '#navigation',
		events: {
			'click #showform': 'showForm',
			'click #showsearch': 'showSearch'
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
		}
	});

	var navigationView = new NavigationView();

	return navigationView;
});