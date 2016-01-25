var React = require('react');
var CommentList = require('./tutorial5');
var CommentForm = require('./tutorial2').CommentForm;

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.props.data} />
      <CommentForm />
      </div>
    );
  }
});

module.exports = CommentBox;
// ReactDOM.render(
//   <CommentBox data={data} />,
//   document.getElementById('content')
// );
