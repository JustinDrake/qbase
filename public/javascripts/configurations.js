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
		'navigationView': 'navigationView'
	}
});

require(['app']);