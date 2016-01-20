jest.dontMock('../tutorial3');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
import { CommentList, CommentForm } from '../tutorial2';

describe("CommentBox", function() {
  it("renders a comment box with comment list and comment form", function() {
    var CommentBox = require('../tutorial3');
    var commentBox = TestUtils.renderIntoDocument(
      <CommentBox />
    );

    var box = ReactDOM.findDOMNode(commentBox);

    expect(box.getAttribute("class")).toEqual("commentBox");
    expect(TestUtils.findRenderedDOMComponentWithTag(commentBox, 'h1')).toEqual(true);
  });
});
