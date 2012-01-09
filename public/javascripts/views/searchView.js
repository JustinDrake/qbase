define(
	['underscore', 'backbone', 'questionList', 'autocomplete'],
	function (_, Backbone, questionList) {
		var SearchView = Backbone.View.extend({
			el: '#searchview',
			initialize: function () {
				$(this.el)
					.on('click', '#searchbutton', function () {
						$.ajax({
							url: '/search',
							data: $('#searchinput').val(),
							success: function (data) {
								questionList.reset(data);
							},
							error: function () {
								console.error('Error in getting the search results!');
							}
						});
					});

				$('#searchinput')
					.autocomplete({
						source: function (request, response) {
							$.ajax({
								url: 'https://en.wikipedia.org/w/api.php?action=opensearch&namespace=0&limit=5&search=' + request.term + '&callback=?',
								dataType: 'jsonp',
								success: function (data) {
									response(data[1]);
								}
							});
						}
					});
			}
		});

		return new SearchView();
	}
);