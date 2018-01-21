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
        del: false
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getPost(id)
    }
    submitPostVote = (id, value) => {
        this.props.submitVote(id, value);
    }
    delete = (id) => {
        this.props.deletePost(id);
        this.setState({ del: true })
    }
    render() {
        const { del } = this.state;
        const { post, isLoading } = this.props;
        return del ? (<Redirect to="/" />)
            : (post && post.id && !post.deleted ? (
                <div>
                    <div className="row">
                        <Header title={capitalize(post.category)} />
                        <div className="col-xs-12">
                            <PostDetails onDelete={this.delete} post={post} onSubmitPostVote={this.submitPostVote} />
                        </div>
                    </div>
                    <CommentList post={post} />
                </div>
            ) : (!isLoading && <Redirect to="/404" />)
            )

    }

}

const mapStateToProps = ({ posts }, ownProps) => {
    return {
        post: posts.posts.filter(p => p.id === ownProps.match.params.id)[0],
        isLoading: posts.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (id) => fetchPost(id)(dispatch),
        submitVote: (id, value) => votePost(id, value)(dispatch),
        deletePost: (id) => deletePost(id)(dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)