console.log('Inside navigation view');

define(['jquery', 'underscore', 'backbone', 'formView'], function ($, _, Backbone, formView) {
	var NavigationView = Backbone.View.extend({
		el: '.container',
		events: {
			'click #showform': 'showForm'
		},
		initialize: function () {
			
		},
		showForm: function () {
			console.log('Inside showForm')
			console.log(this.options.formView);
			this.options.formView.show();
		}
	});

	console.log('Inside navigationView', $().jquery, _.VERSION, Backbone.VERSION, formView);

	var navigationView = new NavigationView({
		formView: formView
	});

	return navigationView;
});