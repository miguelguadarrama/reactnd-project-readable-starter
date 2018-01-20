import React, { Component } from 'react'
import pushid from 'pushid'
import { addComment } from '../actions/comment'
import { connect } from 'react-redux'

class AddReplyComponent extends Component {
    state = {
        body: '',
        author: ''
    }
    onSetBody = (e) => {
        this.setState({ body: e.target.value })
    }
    onSetAuthor = (e) => {
        this.setState({ author: e.target.value })
    }
    submit = () => {
        const comment = {
            id: pushid(),
            parentId: this.props.comment.parentId,
            parentPostId: this.props.comment.id,
            timestamp: Date.now(),
            body: this.state.body,
            author: this.state.author,
            voteScore: 0,
            deleted: false,
            parentDeleted: false
        }
        this.props.addComment(comment);
        this.props.onReply();
    }
    render() {
        const { body, author } = this.state
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-4">
                    <div className="form-group">
                        <textarea value={body} onChange={this.onSetBody} className="form-control" rows="2" placeholder="Your comment goes here" />
                    </div>
                    <div className="form-group">
                        <input type="text" value={author} onChange={this.onSetAuthor} className="form-control" placeholder="Your name" />
                    </div>
                    <button disabled={!body.length || !author.length} onClick={this.submit} type="button" className="btn btn-sm btn-primary">Add Reply</button>
                    {' '}
                    <button onClick={this.props.onReply} type="button" className="btn btn-sm btn-default">Cancel</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comment) => addComment(comment)(dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddReplyComponent)