jest.dontMock('../tutorial2');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe("CommentList", function() {
  it("renders a comment list", function() {
    var CommentList = require('../tutorial2').CommentList;
    var commentList = TestUtils.renderIntoDocument(
      <CommentList />
    );

    var list = ReactDOM.findDOMNode(commentList);

    expect(list.textContent).toEqual("Hello, world! I am a CommentList.");
    expect(list.getAttribute("class")).toEqual("commentList");
  });
});

describe("CommentForm", function() {
  it("renders a comment form", function() {
    var CommentForm = require('../tutorial2').CommentForm;
    var commentForm = TestUtils.renderIntoDocument(
      <CommentForm />
    );

    var form = ReactDOM.findDOMNode(commentForm);

    expect(form.textContent).toEqual("Hello, world! I am a CommentForm.");
    expect(form.getAttribute("class")).toEqual("commentForm");
  });
});
