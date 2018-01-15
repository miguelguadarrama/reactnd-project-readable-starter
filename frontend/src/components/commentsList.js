import React, { Component } from 'react'
import * as Api from '../utils/api'
import { connect } from 'react-redux'
import { SetComments } from '../actions'
import Comment from './comment'
import { sorter } from '../utils/helpers'

class CommentList extends Component {
    state = {
        id: null
    }
    componentDidMount() {
        const id = this.props.post.id;
        Api.getComments(id).then(data => {
            this.props.setComments(data)
        })
    }
    onSubmitPostVote() {

    }
    replyComment = (e) => {
        e.preventDefault();
    }
    render() {
        const { comments, post } = this.props;
        return (
            <div className="row">
                <div className="col-xs-12">
                    {comments &&  (
                        <div className="posts media-list">
                            {comments.filter(f => f.parentId === post.id && !f.parentPostId && !f.deleted).map(comment => (
                                <Comment key={comment.id} comment={comment} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ commentData }) => {
    return {
        comments: commentData.comments.sort(sorter('date'))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setComments: (comments) => dispatch(SetComments(comments))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList)