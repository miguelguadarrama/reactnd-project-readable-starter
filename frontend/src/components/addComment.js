import React, { Component } from 'react'
import pushid from 'pushid'
import { addComment } from '../actions/comment'
import { connect } from 'react-redux'

class AddCommentComponent extends Component {
    state = {
        collapsed: true,
        body: '',
        author: ''
    }
    collapse = () => {
        this.setState(state => ({
            collapsed: !state.collapsed,
            body: '',
            author: ''
        }))
    }
    onInputChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }
    onInputAuthorChange = (e) => {
        this.setState({
            author: e.target.value
        })
    }
    submit = () =>{
        const comment = {
            id: pushid(),
            body: this.state.body,
            deleted: 0,
            parentId: this.props.post.id,
            parentPostId: this.props.parentPostId || null,
            timestamp: Date.now(),
            author: this.state.author,
            voteScore: 0,
            parentDeleted: false
        }
        this.props.addComment(comment);
        this.collapse()
    }
    render() {
        const { collapsed, body, author } = this.state;
        return collapsed ? (
            <div className="row">
                <hr />
                <div className="col-xs-12">
                    <button type="button" onClick={this.collapse} className="btn btn-sm btn-primary">add comment!</button>
                </div>
            </div>
        ) : (
            <div className="row">
                <hr />
                <div className="col-xs-12 col-sm-4">
                    <div className="form-group">
                        <label>Comments?</label>
                        <textarea onChange={this.onInputChange} value={body} className="form-control" rows="3" placeholder="Insert your comment here"></textarea>
                    </div>
                    <div className="form-group">
                        <input type="text" value={author} onChange={this.onInputAuthorChange} className="form-control" placeholder="Your name" />
                    </div>
                    <div className="form-group">
                        <button disabled={!author || !body} type="button" onClick={this.submit} className="btn btn-sm btn-primary">Submit comment</button>
                        {' '}
                        <button type="button" onClick={this.collapse} className="btn btn-sm btn-default">Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comment) => addComment(comment)(dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AddCommentComponent)