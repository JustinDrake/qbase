define([
	'jquery',
	'underscore',
	'backbone',
	'formView',
	'questionListView'
], function ($, _, Backbone) {
	if ($ && _ && Backbone) {
	//	console.log('jquery', $().jquery, 'underscore', _.VERSION, 'Backbone', Backbone.VERSION);
	} else {
		console.error('A module is missing!');
	}
});