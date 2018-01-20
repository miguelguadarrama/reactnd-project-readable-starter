import React, { Component } from 'react'
//import * as Api from '../utils/api'
import { connect } from 'react-redux'
import { fetchComments } from '../actions/comment'
import Comment from './comment'
import { sorter } from '../utils/helpers'

class CommentList extends Component {
    state = {
        id: null
    }
    componentDidMount() {
        const id = this.props.post.id;
        this.props.fetchComments(id)
    }
    
    replyComment = (e) => {
        e.preventDefault();
    }
    render() {
        const { comments, post } = this.props;
        return (
            <div className="row">
                <div className="col-xs-12">
                    {comments && (
                        <div className="posts media-list">
                            {comments.filter(f => f.parentId === post.id && !f.parentPostId).map(comment => (
                                <Comment key={comment.id} comment={comment} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ comments }) => {
    return {
        comments: comments.comments.sort(sorter('date'))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: id => fetchComments(id)(dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList)