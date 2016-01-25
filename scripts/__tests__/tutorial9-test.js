jest.dontMock('../tutorial9').dontMock('../tutorial8').dontMock('../tutorial5');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe("CommentBox", function() {
	it("renders a comment list with comments having test data", function() {
		var CommentBox = require('../tutorial9');
		var CommentList = require('../tutorial5');
		var testData = require('../tutorial8');

		var renderer = TestUtils.createRenderer();
		renderer.render(<CommentBox data={testData} />);
		var result = renderer.getRenderOutput();

		expect(result.props.children[1]).toEqual(<CommentList data={testData} />);
	});
});