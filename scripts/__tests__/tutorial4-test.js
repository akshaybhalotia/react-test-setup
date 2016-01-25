jest.dontMock('../tutorial4');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe("Comment", function() {
	it("renders a comment", function() {
		var Comment = require('../tutorial4');
		var comment = TestUtils.renderIntoDocument(
			<Comment />
			);

		var result = ReactDOM.findDOMNode(comment);

		expect(result.innerHTML).toMatch('h2 class="commentAuthor"');
		expect(result.getAttribute("class")).toEqual("comment");
	});

	it("fetches data from props", function() {
		var Comment = require('../tutorial4');
    
		var renderer = TestUtils.createRenderer();
		renderer.render(<Comment author="x" children="y"/>);
		var result = renderer.getRenderOutput();

		expect(result.type).toBe('div');
		expect(result.props.children[0]).toEqual(<h2 className="commentAuthor">x</h2>);
		expect(result.props.children[1]).toEqual("y");
	});
});