jest.dontMock('../tutorial3');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe("CommentBox", function() {

  var CommentBox, commentBox;
  beforeEach(function() {
    CommentBox = require('../tutorial3');
  });

  it("renders a comment box", function() {
    commentBox = TestUtils.renderIntoDocument(
      <CommentBox />
    );

    var box = ReactDOM.findDOMNode(commentBox);
    var h1 = TestUtils.findRenderedDOMComponentWithTag(commentBox, 'h1');

    expect(box.getAttribute("class")).toEqual("commentBox");
    expect(h1.textContent).toEqual("Comments");
  });

  it("contains CommentList", function() {
    var CommentList = require('../tutorial2').CommentList;
    
    var renderer = TestUtils.createRenderer();
    renderer.render(<CommentBox />);
    var result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children[1]).toEqual(<CommentList />);
  });

  it("contains CommentForm", function() {
    var CommentForm = require('../tutorial2').CommentForm;
    
    var renderer = TestUtils.createRenderer();
    renderer.render(<CommentBox />);
    var result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children[2]).toEqual(<CommentForm />);
  });
});
