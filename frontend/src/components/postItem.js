import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as ta from 'time-ago'
import Score from './score'
import { Vote } from '../actions'
import { connect } from 'react-redux'
import * as Api from '../utils/api'

class PostItem extends Component {
    submitPostVote = (id, value) => {
        Api.submitVote(id, value)
        this.props.submitVote(id, value);
    }
    render() {
        const { post } = this.props;
        return (
            <li className="media">
                <Score onSubmitVote={this.submitPostVote} post={post} />
                <div className="media-body">
                    <h4 className="media-heading"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h4>
                    submitted <time title={new Date(post.timestamp).toUTCString()} timestamp={post.timestamp}>{ta.ago(post.timestamp)}</time> by <Link to={`/u/${post.author}`}>{post.author}</Link>{' '}
                    <span className="category-link">{post.category}</span>
                    <ul className="list post-options">
                        <li><Link to={`/${post.category}/${post.id}`}>{post.commentCount} comments</Link></li>
                        <li><Link to={`/${post.category}/${post.id}/edit`}>edit</Link></li>
                        <li><button type="button" className="button-link">delete</button></li>
                    </ul>
                </div>
            </li>
        )
    }
}

const mapStateToProps = ({ postData }) => {
    return {
        posts: postData.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitVote: (id, value) => dispatch(Vote(id, value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostItem)