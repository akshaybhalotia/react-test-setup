jest.dontMock('../example').dontMock('marked').dontMock('../tutorial8');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var $ = require('jquery');
var Comment = require('../example').Comment;
var CommentList = require('../example').CommentList;
var CommentForm = require('../example').CommentForm;
var CommentBox = require('../example').CommentBox;

describe("Comment", function() {

	it("renders a comment", function() {
		var comment = TestUtils.renderIntoDocument(
			<Comment author="x" children="*y*" />
			);

		var result = ReactDOM.findDOMNode(comment);

		expect(result.innerHTML).toMatch('h2 class="commentAuthor"');
		expect(result.getAttribute("class")).toEqual("comment");
	});

	it("calls markdown conversion method", function() {
		var temp = Comment.prototype.__reactAutoBindMap.rawMarkup;
		Comment.prototype.__reactAutoBindMap.rawMarkup = jest.genMockFn();;
		var comment = TestUtils.renderIntoDocument(
			<Comment author="x" children="*y*" />
			);

		expect(Comment.prototype.__reactAutoBindMap.rawMarkup.mock.calls.length).toBe(1);
		Comment.prototype.__reactAutoBindMap.rawMarkup = temp;
	});

	it("converts children to markdown", function() {
		var comment = TestUtils.renderIntoDocument(
			<Comment author="x" children="*y*" />
			);

		expect(comment.rawMarkup()).toEqual({__html : '<p><em>y</em></p>\n'});
	});

	it("fetches data from props", function() {
		var renderer = TestUtils.createRenderer();
		renderer.render(<Comment author="x" children="*y*"/>);
		var result = renderer.getRenderOutput();

		expect(result.type).toBe('div');
		expect(result.props.children[0]).toEqual(<h2 className="commentAuthor">x</h2>);
		expect(result.props.children[1].type).toBe('span');
	});
});

describe("CommentList", function() {

	it("renders a comment list", function() {
		var testData = require('../tutorial8');
		var commentList = TestUtils.renderIntoDocument(
			<CommentList data={ testData } />
			);

		var result = ReactDOM.findDOMNode(commentList);

		expect(result.getAttribute("class")).toEqual("commentList");
	});

	it("contains comments rendered using data", function() {
		var testData = require('../tutorial8');
		var renderer = TestUtils.createRenderer();
		renderer.render(<CommentList data={ testData } />);
		var result = renderer.getRenderOutput();

		expect(result.type).toBe('div');
		expect(result.props.children[0]).toEqual(<Comment key="1" author="Pete Hunt" children="This is one comment"></Comment>);
		expect(result.props.children[1]).toEqual(<Comment key="2" author="Jordan Walke" children="This is *another* comment"></Comment>);
	});
});

describe("CommentForm", function() {

	it("renders a comment form", function() {
		var commentForm = TestUtils.renderIntoDocument(
			<CommentForm />
			);

		var result = ReactDOM.findDOMNode(commentForm);

		expect(result.getAttribute("class")).toEqual("commentForm");
	});

	it("sets initial state to be empty", function() {
		var commentForm = TestUtils.renderIntoDocument(
			<CommentForm />
			);

		expect(commentForm.state).toEqual({ "author": "", "text": "" });
	});

	it("contains input fields and submit button", function() {
		var renderer = TestUtils.createRenderer();
		renderer.render(<CommentForm />);
		var result = renderer.getRenderOutput();

		expect(result.type).toBe('form');
		expect(result.props.children[0].type).toBe('input');
		expect(result.props.children[0].props.type).toBe('text');
		expect(result.props.children[1].type).toBe('input');
		expect(result.props.children[1].props.type).toBe('text');
		expect(result.props.children[2].type).toBe('input');
		expect(result.props.children[2].props.type).toBe('submit');
	});

	it("calls handleAuthorChange on changing author name", function() {
		var temp = CommentForm.prototype.__reactAutoBindMap.handleAuthorChange;
		CommentForm.prototype.__reactAutoBindMap.handleAuthorChange = jest.genMockFn();;
		var commentForm = TestUtils.renderIntoDocument(
			<CommentForm />
			);

		TestUtils.Simulate.change(TestUtils.scryRenderedDOMComponentsWithTag(commentForm, 'input')[0], { target: { value: 'x' } });

		expect(CommentForm.prototype.__reactAutoBindMap.handleAuthorChange).toBeCalled();
		CommentForm.prototype.__reactAutoBindMap.handleAuthorChange = temp;
	});

	it("calls handleTextChange on changing comment", function() {
		var temp = CommentForm.prototype.__reactAutoBindMap.handleTextChange;
		CommentForm.prototype.__reactAutoBindMap.handleTextChange = jest.genMockFn();;
		var commentForm = TestUtils.renderIntoDocument(
			<CommentForm />
			);

		TestUtils.Simulate.change(TestUtils.scryRenderedDOMComponentsWithTag(commentForm, 'input')[1], { target: { value: 'x' } });

		expect(CommentForm.prototype.__reactAutoBindMap.handleTextChange).toBeCalled();
		CommentForm.prototype.__reactAutoBindMap.handleTextChange = temp;
	});

	it("calls handleSubmit on submit", function() {
		var temp = CommentForm.prototype.__reactAutoBindMap.handleSubmit;
		CommentForm.prototype.__reactAutoBindMap.handleSubmit = jest.genMockFn();;
		var commentForm = TestUtils.renderIntoDocument(
			<CommentForm />
			);

		var result = ReactDOM.findDOMNode(commentForm);

		TestUtils.Simulate.submit(result);

		expect(CommentForm.prototype.__reactAutoBindMap.handleSubmit).toBeCalled();
		CommentForm.prototype.__reactAutoBindMap.handleSubmit = temp;
	});

	describe("handles form submit", function() {

		it("prevents default method", function() {
			var e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
			var commentForm = TestUtils.renderIntoDocument(
				<CommentForm />
				);

			commentForm.handleSubmit(e);

			expect(e.preventDefault).toHaveBeenCalled();
		});

		it("does nothing if any of the text fields are empty", function() {
			var spy = jest.genMockFn();
			var e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
			var commentForm = TestUtils.renderIntoDocument(
				<CommentForm onCommentSubmit={ spy } />
				);
			
			commentForm.handleSubmit(e);

			expect(spy).not.toBeCalled();
			expect(commentForm.state).toEqual({ "author": "", "text": "" });
		});

		it("calls onCommentSubmit from props", function() {
			var spy = jest.genMockFn();
			var e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
			var commentForm = TestUtils.renderIntoDocument(
				<CommentForm onCommentSubmit={ spy } />
				);
			
			commentForm.state = { "author": "x", "text": "y" };
			commentForm.handleSubmit(e);

			expect(spy).toBeCalled();
			expect(spy).lastCalledWith({ "author": "x", "text": "y" });
		});

		it("sets state to empty vars", function() {
			var spy = jest.genMockFn();
			var e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
			var commentForm = TestUtils.renderIntoDocument(
				<CommentForm onCommentSubmit={ spy } />
				);
			
			commentForm.state = { "author": "x", "text": "y" };
			commentForm.handleSubmit(e);

			expect(commentForm.state).toEqual({ "author": "", "text": "" });
		});
	});

	describe("handles author change", function() {

		it("sets state by reading value of author", function() {
			var e = { target: { value: 'x'}};
			var commentForm = TestUtils.renderIntoDocument(
				<CommentForm />
				);

			commentForm.handleAuthorChange(e);

			expect(commentForm.state).toEqual({ "author": "x", "text": "" });
		});
	});

	describe("handles comment change", function() {

		it("sets state by reading value of comment", function() {
			var e = { target: { value: 'x'}};
			var commentForm = TestUtils.renderIntoDocument(
				<CommentForm />
				);

			commentForm.handleTextChange(e);

			expect(commentForm.state).toEqual({ "author": "", "text": "x" });
		});
	});
});

describe("CommentBox", function() {

	it("renders a comment box", function() {
		var commentBox = TestUtils.renderIntoDocument(
			<CommentBox />
			);

		var result = ReactDOM.findDOMNode(commentBox);

		expect(result.innerHTML).toMatch('h1');
		expect(result.getAttribute("class")).toEqual("commentBox");
	});

	it("renders list and form for comments", function() {
		var renderer = TestUtils.createRenderer();
		renderer.render(<CommentBox />);
		var result = renderer.getRenderOutput();

		expect(result.type).toBe('div');
		expect(result.props.children[0].type).toBe('h1');
		expect(result.props.children[1].type).toBe(CommentList);
		expect(result.props.children[2].type).toBe(CommentForm);
	});

	it("sets initial state", function() {
		var commentBox = TestUtils.renderIntoDocument(
			<CommentBox />
			);

		expect(commentBox.state.data).toEqual([]);
	});

	it("calls loadCommentsFromServer on mount", function() {
		var temp = CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer;
		CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer = jest.genMockFn();
		var commentBox = TestUtils.renderIntoDocument(
			<CommentBox />
			);

		expect(CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer).toBeCalled();
		CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer = temp;
	});

	it("calls loadCommentsFromServer after every pollInterval", function() {
		jasmine.clock().uninstall();
		jasmine.clock().install();

		var temp = CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer;
		CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer = jest.genMockFn();
		var commentBox = TestUtils.renderIntoDocument(
			<CommentBox pollInterval={100}/>
			);

		expect(CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer.mock.calls.length).toBe(1);

		jasmine.clock().tick(101);

		expect(CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer.mock.calls.length).toBe(2);		
		CommentBox.prototype.__reactAutoBindMap.loadCommentsFromServer = temp;

		jasmine.clock().uninstall();
		jasmine.clock().install();
	});

	describe("loadCommentsFromServer", function() {

		it("calls given URL", function() {
			spyOn($, 'ajax');
			var commentBox = TestUtils.renderIntoDocument(
				<CommentBox url="testURL" />
				);

			expect($.ajax.calls.count()).toBe(1);
			expect($.ajax).toHaveBeenCalledWith({ dataType: 'json', cache: false, url: 'testURL', success: jasmine.any(Function), error: jasmine.any(Function) });
		});

		it("updates state on success", function() {
			var testData = require('../tutorial8');
			spyOn($, 'ajax').and.callFake(function(options) {
				options.success(testData);
			});
			var commentBox = TestUtils.renderIntoDocument(
				<CommentBox url="testURL" />
				);

			expect(commentBox.state.data).toEqual(testData);
		});
	});

	describe("handleCommentSubmit", function() {

		it("calls given URL", function() {
			var commentBox = TestUtils.renderIntoDocument(
				<CommentBox url="testURL" />
				);
			spyOn($, 'ajax');
			var testData = { "author": "x", "text": "y", "id": Date.now() };
			commentBox.handleCommentSubmit(testData);

			expect($.ajax.calls.count()).toBe(1);
			expect($.ajax).toHaveBeenCalledWith({ dataType: 'json', data: testData, type: 'POST', url: 'testURL', success: jasmine.any(Function), error: jasmine.any(Function) });
		});

		it("updates state on success", function() {
			var testData = require('../tutorial8');
			var commentBox = TestUtils.renderIntoDocument(
				<CommentBox url="testURL" />
				);
			spyOn($, 'ajax').and.callFake(function(options) {
				options.success(testData);
			});
			commentBox.handleCommentSubmit({ "author": "x", "text": "y", "id": Date.now() });

			expect(commentBox.state.data).toEqual(testData);
		});
	});
});
