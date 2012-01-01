define([
	'jquery',
	'underscore',
	'backbone',
	'formView',
	'questionListView',
	'searchView',
	'navigationView'
], function ($, _, Backbone) {
	if ($ && _ && Backbone) {
	//	console.info('jquery', $().jquery, 'underscore', _.VERSION, 'Backbone', Backbone.VERSION);
	} else {
		console.error('A module is missing!');
	}
});