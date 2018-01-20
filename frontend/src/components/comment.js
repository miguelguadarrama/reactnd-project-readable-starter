import React, { Component } from 'react'
import Score from './score'
import * as ta from 'time-ago'
import { connect } from 'react-redux'
import { editComment, deleteComment, voteComment } from '../actions/comment'
import AddReplyComponent from './addReplyComment'
//import * as Api from '../utils/api'

class Comment extends Component {
    state = {
        edit: false,
        body: this.props.comment.body,
        isReplying: false
    }
    onInputChange = (event) => {
        this.setState({ body: event.target.value })
    }
    toggleEdit = (e = null) => {
        if (e) e.preventDefault();
        this.setState(state => ({
            edit: !state.edit
        }))
    }
    submit = () => {
        const id = this.props.comment.id;
        const obj = { id, body: this.state.body, timestamp: Date.now() }
        this.editThisComment(obj)
    }
    editThisComment = (comment) => {
        this.props.editThisComment(comment.id, comment.body, comment.timestamp)
        this.toggleEdit();
    }
    deleteThisComment = (e, id) => {
        e.preventDefault();
        return this.props.deleteComment(id, this.props.comment.parentId);
    }
    onSubmitPostVote = (id, value) => {
        console.log(id, value)
        this.props.submitVote(id, value)
    }
    replyComment = (e, comment) => {
        e.preventDefault();
        this.setState({ isReplying: true })
    }
    onReply = () => {
        this.setState({ isReplying: false } )
    }
    render() {
        const { comment, comments } = this.props;
        const { edit, body } = this.state;
        return (
            <div className="media">
                <Score onSubmitVote={this.onSubmitPostVote} post={comment} />
                <div className="media-body">
                    {!edit ? (comment.body) : (
                        <div className="row">
                            <div className="col-xs-12 col-sm-4">
                                <div className="form-group">
                                    <textarea className="form-control" value={body} onChange={this.onInputChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <button onClick={this.submit} type="button" className="btn btn-sm btn-primary">Edit!</button>
                                    {' '}<button onClick={this.toggleEdit} type="button" className="btn btn-sm btn-default">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="metadata">
                        submitted <time timestamp={comment.timestamp} title={new Date(comment.timestamp).toDateString()}>{ta.ago(comment.timestamp)}</time> by {comment.author}
                    </div>
                    {!comment.deleted && (
                        <ul className="list post-options">
                            <li><a href="/reply" onClick={(e) => this.replyComment(e, comment)}>Reply</a></li>
                            <li><a href="/edit" onClick={this.toggleEdit}>edit</a></li>
                            <li><a onClick={(e) => this.deleteThisComment(e, comment.id)}>delete</a></li>
                        </ul>
                    )}
                    {this.state.isReplying && (
                        <AddReplyComponent onReply={this.onReply} comment={comment} />
                    )}
                    {comments && comments.filter(f => f.parentPostId === comment.id).map(c => (
                        <Comment deleteComment={this.props.deleteComment} deleteThisComment={this.deleteThisComment} submitVote={this.props.submitVote} onSubmitVote={this.onSubmitPostVote} editThisComment={this.editThisComment} key={c.id} post={c} comment={c} comments={comments} />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ comments }) => {
    return {
        comments: comments.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editThisComment: (id, body, timestamp) => dispatch(editComment({ id, body, timestamp })),
        submitVote: (id, value) => dispatch(voteComment(id, value)),
        deleteComment: (id, parentId) => dispatch(deleteComment(id, parentId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)