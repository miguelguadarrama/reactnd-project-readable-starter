import React, { Component } from 'react'
import Header from './header'
import { capitalize } from '../utils/helpers'
import Score from './score'
import { Link, Redirect } from 'react-router-dom'
import * as ta from 'time-ago'
import * as Api from '../utils/api'
import { Vote } from '../actions'
import { connect } from 'react-redux'

class Post extends Component {
    state = {
        loading: true,
        post: {},
        category: ''
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        const cat = this.props.match.params.category;
        Api.getPost(id)
            .then(data => {
                this.setState({ post: data, loading: false, category: data.category || cat })
            }).catch(() => this.setState({ post: {}, loading: false, category: cat }))

    }
    submitPostVote = (id, value) => {
        Api.submitVote(id, value)
        this.props.submitVote(id, value);
        this.setState(state => state.post.voteScore += value)
    }
    render() {
        const { post, loading, category } = this.state;
        return post && post.id ? (
            <div className="row">
                <Header title={capitalize(post.category)} />
                <div className="col-xs-12">
                    <PostDetails post={post} onSubmitPostVote={this.submitPostVote} />
                </div>
            </div>
        ) : (!loading && !post.id ?
            (<Redirect to={`/${category}`} />) : '')
    }
}

const mapStateToProps = ({ postData }) => {
    return {
        posts: postData.post
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
)(Post)

const PostDetails = (props) => {
    const { post, onSubmitPostVote } = props;
    return (
        <div className="media-list posts">
            <div className="media">
                <Score onSubmitVote={onSubmitPostVote} post={post} />
                <div className="media-body">
                    <h4 className="media-heading">{post.title}</h4>
                    submitted <time title={new Date(post.timestamp).toUTCString()} timestamp={post.timestamp}>{ta.ago(post.timestamp)}</time> by <Link to={`/u/${post.author}`}>{post.author}</Link>{' '}
                    <span className="category-link">{post.category}</span>
                    <div className="media-content">
                        {post.body}
                    </div>
                    <ul className="list post-options">
                        <li><Link to={`/${post.category}/${post.id}`}>{post.commentCount} comments</Link></li>
                        <li><Link to={`/${post.category}/${post.id}/edit`}>edit</Link></li>
                        <li><button type="button" className="button-link">delete</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}