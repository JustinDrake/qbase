require.config({
	paths: {
		'underscore': 'dependencies/underscore',
		'backbone': 'dependencies/backbone',
		'formView': 'form/formView',
		'questionList': 'questionList/questionList',
		'questionListView': 'questionList/questionListView',
		'QuestionModel': 'question/QuestionModel',
		'QuestionView': 'question/QuestionView',
		'timeago': 'dependencies/jQueryPlugins/jquery.timeago',
		'tagsinput': 'dependencies/jQueryPlugins/jquery.tagsinput.min.js',
		'navigationView': 'navigationView',
		'searchView': 'search/searchView',
		'autocomplete': 'dependencies/jQueryPlugins/jquery-ui-1.8.16.custom.min',
		'userModel': 'userModel',
		'chosen': 'dependencies/jQueryPlugins/jquery.chosen',
		'fcbkcomplete': 'dependencies/jQueryPlugins/jquery.fcbkcomplete.min'
	}
});

require(['app']);