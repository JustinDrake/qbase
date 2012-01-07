define(
	['underscore', 'backbone'],
	function (_, Backbone) {
		var UserModel = Backbone.Model.extend({});

		var userModel = new UserModel();

		return userModel;
	}
);