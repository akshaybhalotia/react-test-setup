jest.dontMock('../tutorial1');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe("CommentBox", function() {
  it("renders a comment box", function() {
    var CommentBox = require('../tutorial1');
    var commentBox = TestUtils.renderIntoDocument(
      <CommentBox />
    );

    var box = ReactDOM.findDOMNode(commentBox);

    expect(box.textContent).toEqual("Hello, world! I am a CommentBox.");
    expect(box.getAttribute("class")).toEqual("commentBox");
  });
});
