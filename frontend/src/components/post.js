import React, { Component } from 'react'
import Header from './header'
import { capitalize } from '../utils/helpers'
import { Redirect } from 'react-router-dom'
//import * as ta from 'time-ago'
import { connect } from 'react-redux'
import CommentList from './commentsList'
//import Score from './score'
//import AddCommentComponent from './addComment'
import { deletePost, votePost, fetchPost } from '../actions/post'
import PostDetails from './postDetails'

class Post extends Component {
    state = {
        loading: true,
        category: '',
        del: false
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        //const cat = this.props.match.params.category;
        /*getPost(id)
            .then(data => {
                this.setState({ post: data, loading: false, category: data.category || cat })
            }).catch(() => this.setState({ post: {}, loading: false, category: cat }))
        */
        this.props.getPost(id)
    }
    submitPostVote = (id, value) => {
        this.props.submitVote(id, value);
        //this.setState(state => state.post.voteScore += value)
    }
    delete = (id) => {
        this.props.deletePost(id);
        this.setState({ del: true })
    }
    render() {
        const { loading, category, del } = this.state;
        const { post } = this.props;
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

const mapStateToProps = ({ posts }, ownProps) => {
    return {
        post: posts.posts.filter(p => p.id === ownProps.match.params.id)[0]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (id) => dispatch(fetchPost(id)),
        submitVote: (id, value) => dispatch(votePost(id, value)),
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)

/*const PostDetails = (props) => {
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
}*/