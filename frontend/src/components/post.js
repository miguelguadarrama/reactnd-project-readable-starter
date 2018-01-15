import React, { Component } from 'react'
import Header from './header'
import { capitalize } from '../utils/helpers'
import Score from './score'
import { Link, Redirect } from 'react-router-dom'
import * as ta from 'time-ago'
import * as Api from '../utils/api'
import { Vote } from '../actions'
import { connect } from 'react-redux'
import AddCommentComponent from './addComment'
import CommentList from './commentsList'
import { DeletePostAction } from '../actions'

class Post extends Component {
    state = {
        loading: true,
        post: {},
        category: '',
        del: false
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
    delete = (id) => {
        this.props.deletePost(id);
        this.setState({del: true})
        Api.deletePost(id)
    }
    render() {
        const { post, loading, category, del } = this.state;
        return del ? <Redirect to={`/${post.category}`} /> : (post && post.id ? (
            <div>
                <div className="row">
                    <Header title={capitalize(post.category)} />
                    <div className="col-xs-12">
                        <PostDetails onDelete={this.delete} post={post} onSubmitPostVote={this.submitPostVote} />
                    </div>
                </div>
                <CommentList post={post} />
            </div>
        ) : (!loading && !post.id ?
            (<Redirect to={`/${category}`} />) : '')
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
        submitVote: (id, value) => dispatch(Vote(id, value)),
        deletePost: (id) => dispatch(DeletePostAction(id))
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
                        <li><button onClick={() => props.onDelete(post.id)} type="button" className="button-link">delete</button></li>
                    </ul>
                </div>
            </div>
            <AddCommentComponent post={post} />
        </div>
    )
}