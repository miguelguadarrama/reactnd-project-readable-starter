import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as ta from 'time-ago'
import Score from './score'
import { connect } from 'react-redux'
import { deletePost, votePost } from '../actions/post'

class PostItem extends Component {
    submitPostVote = (id, value) => {
        this.props.submitVote(id, value);
    }
    delete = (id) => {
        this.props.deletePost(id)
    }
    render() {
        const { post } = this.props;
        return (
            <li className="media">
                <Score onSubmitVote={this.submitPostVote} post={post} />
                <div className="media-body">
                    <h4 className="media-heading"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h4>
                    submitted <time title={new Date(post.timestamp).toUTCString()} timestamp={post.timestamp}>{ta.ago(post.timestamp)}</time> by {post.author}{' '}
                    <span className="category-link">{post.category}</span>
                    <ul className="list post-options">
                        <li><Link to={`/${post.category}/${post.id}`}>{post.commentCount} comment{post.commentCount !== 1 ? 's':''}</Link></li>
                        <li><Link to={`/${post.category}/${post.id}/edit`}>edit</Link></li>
                        <li><button onClick={() => this.delete(post.id)} type="button" className="button-link">delete</button></li>
                    </ul>
                </div>
            </li>
        )
    }
}

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitVote: (id, value) => votePost(id, value)(dispatch),
        deletePost: (id) => deletePost(id)(dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostItem)