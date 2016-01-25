jest.dontMock('../tutorial8').dontMock('../tutorial10');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe("CommentBox", function() {
	it("renders a comment list with comments having test data", function() {
		var CommentList = require('../tutorial10');
		var testData = require('../tutorial8');

		var renderer = TestUtils.createRenderer();
		renderer.render(<CommentList data={testData} />);
		var result = renderer.getRenderOutput();

		expect(result.props.children.length).toBe(2);
	});
});