define(['QuestionModel', 'QuestionView'], function (QuestionModel, QuestionView) {
	describe("Upvote", function () {
		var dummyQuestionModel = new QuestionModel();
		var testQuestionView = new QuestionView({model: dummyQuestionModel});

		it('should increment by one', function () {
			var previousUpvote = dummyQuestionModel.get('upVotes');
			testQuestionView.upvote();

			expect(dummyQuestionModel.get('upVotes')).toEqual(previousUpvote);
		});
	});
});