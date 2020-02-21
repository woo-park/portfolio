import React, { Component } from 'react';
import PostForm from './PostForm';
import Comment from './Comment';

class Comments extends Component {
  constructor(props) {
    super(props);
    // console.log(props,' from main');
    this.state = {
      showCommentForm: true,
      comment: '',
      author: '',
    }
  }

  onCreateComment = (e) => {
    e.preventDefault();
    if(this.state.author == ''){
      this.state.author = 'Anonymous'
    }
    
    this.props.onCreateComment({
      projectId: this.props.project.id,
      comment: this.state.comment,
      author: this.state.author,
    })

    this.resetForm();
  }

  resetForm() {
    this.setState({
      showCommentForm: false,
      comment: '',
      author: '',
    })
  }

  onCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  onAuthorChange = (e) => {
    this.setState({
      author: e.target.value
    })
  }

  toggleCommentForm = () => {
    this.setState({ showCommentForm: !this.state.showCommentForm });
  }


  render() {
    return (
      <div className="">
        {this.props.project.comment != undefined ? (<div>{this.props.project.comment.map((each, index) =>

          <Comment
            key={index}
            comment={each}
          />
        )}</div>) : 'no comments yet'}

        {this.state.showCommentForm && (
          <form
            className="task-list-form"
            onSubmit={this.onCreateComment}
          >

            <input
              className="full-width-input"
              onChange={this.onAuthorChange}
              value={this.state.author}
              type="text"
              placeholder="author..."
            />
            <input
              className="full-width-input"
              onChange={this.onCommentChange}
              value={this.state.comment}
              type="text"
              placeholder="comment..."
            />
            <button
              className="button"
              type="submit"
            >
              Save
            </button>
          </form>
        )}

        <div className="tasks-header">
          <button
                  className="button button-default"
                  onClick={this.toggleCommentForm}
          >
            + New Comment
          </button>
        </div>

      </div>
    );
  }
}

export default Comments;

/*
<div className="task-list-title">
  <strong>{props.status}</strong>
</div>
{props.tasks.map(task => (
  <Task
    key={task.id}
    task={task}
    onStatusChange={props.onStatusChange}
    onDropTask={props.onDropTask}
    onTaskDetail={props.onTaskDetail}
  />
))}





//ref
{props.task.detailShow ? <hr /> : ''}
{props.task.detailShow ? (<div className="task-detail"> <div>{props.task.detail} </div> </div>) : ''}
*/
