import React, { Component } from 'react'
import * as ta from 'time-ago'
import Score from './score'
import { Link } from 'react-router-dom'
import AddCommentComponent from './addComment'
import { connect } from 'react-redux'

class PostDetails extends Component {
    render() {
        const { post, onSubmitPostVote, onDelete } = this.props;
        return (
            <div className="media-list posts">
                <div className="media">
                    <Score onSubmitVote={onSubmitPostVote} post={post} />
                    <div className="media-body">
                        <h4 className="media-heading">{post.title}</h4>
                        submitted <time title={new Date(post.timestamp).toUTCString()} timestamp={post.timestamp}>{ta.ago(post.timestamp)}</time> by {post.author}{' '}
                        <span className="category-link">{post.category}</span>
                        <div className="media-content">
                            {post.body}
                        </div>
                        <ul className="list post-options">
                            <li><Link to={`/${post.category}/${post.id}`}>{post.commentCount} comment{post.commentCount !== 1 ? 's':''}</Link></li>
                            <li><Link to={`/${post.category}/${post.id}/edit`}>edit</Link></li>
                            <li><button onClick={() => onDelete(post.id)} type="button" className="button-link">delete</button></li>
                        </ul>
                    </div>
                </div>
                <AddCommentComponent post={post} />
            </div>
        )
    }
}

const mapStateToProps = ({ posts }, ownProps) => {
    return {
        posts: posts.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetails)
