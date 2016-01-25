jest.dontMock('../tutorial5');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe("CommentList", function() {
	it("renders a comment list with comments having data", function() {
		var CommentList = require('../tutorial5');

		var renderer = TestUtils.createRenderer();
		renderer.render(<CommentList />);
		var result = renderer.getRenderOutput();

		expect(result.type).toBe('div');
		expect(result.props.children[0]).toEqual(<Comment author="Pete Hunt" children="This is one comment"></Comment>);
		expect(result.props.children[1]).toEqual(<Comment author="Jordan Walke" children="This is *another* comment"></Comment>);
	});
});