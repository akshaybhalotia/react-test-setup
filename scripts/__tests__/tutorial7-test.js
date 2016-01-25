jest.dontMock('../tutorial7').dontMock('marked');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe("Comment", function() {
	it("renders a comment", function() {
		var Comment = require('../tutorial7');
		var comment = TestUtils.renderIntoDocument(
			<Comment author="x" children="*y*" />
			);

		var result = ReactDOM.findDOMNode(comment);

		expect(result.innerHTML).toMatch('h2 class="commentAuthor"');
		expect(result.getAttribute("class")).toEqual("comment");
	});

	it("calls markdown conversion method", function() {
		var Comment = require('../tutorial7');
		Comment.prototype.__reactAutoBindMap.rawMarkup = jest.genMockFn();;
		var comment = TestUtils.renderIntoDocument(
			<Comment author="x" children="*y*" />
			);

		expect(Comment.prototype.__reactAutoBindMap.rawMarkup.mock.calls.length).toBe(1);
	});

	it("converts children to markdown", function() {
		var Comment = require('../tutorial7');
		var comment = TestUtils.renderIntoDocument(
			<Comment author="x" children="*y*" />
			);

		expect(comment.rawMarkup()).toEqual({__html : '<p><em>y</em></p>\n'});
	});

	it("fetches data from props", function() {
		jest.dontMock('../tutorial7');
		var Comment = require('../tutorial7');

		var renderer = TestUtils.createRenderer();
		renderer.render(<Comment author="x" children="*y*"/>);
		var result = renderer.getRenderOutput();

		expect(result.type).toBe('div');
		expect(result.props.children[0]).toEqual(<h2 className="commentAuthor">x</h2>);
		expect(result.props.children[1].type).toBe('span');
	});
});