require.config({
	paths: {
		/* HARD DEPENDENCIES */
		'underscore': 		'dependencies/underscore',
		'backbone': 		'dependencies/backbone',		

		/* VIEWS */
		'QuestionView': 	'views/QuestionView',
		'formView': 		'views/formView',		
		'navigationView': 	'views/navigationView',
		'searchView': 		'views/searchView',
		'questionListView': 'views/questionListView',		

		/* MODELS */
		'QuestionModel': 	'models/QuestionModel',
		'userModel': 		'models/userModel',
		
		/* COLLECTIONS */
		'questionList': 	'collections/questionList',

		/* JQUERY PLUGINS */
		'timeago': 			'jQueryPlugins/jquery.timeago',
		'autocomplete': 	'jQueryPlugins/jquery-ui-1.8.16.custom.min'
	}
});

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