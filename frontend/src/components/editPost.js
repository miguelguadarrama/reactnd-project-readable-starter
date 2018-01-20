import React, { Component } from 'react'
import Header from './header'
import { getPost } from '../utils/api'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { editPost } from '../actions/post'

class EditPost extends Component {
    state = {
        post: {},
        done: false
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        getPost(id)
            .then(data => {
                this.setState({ post: data })
            })
    }
    onInputChange(input, event) {
        const obj = this.state.post;
        obj[input] = event.target.value;
        this.setState({ post: obj });
    }

    submit = () => {
        const { post } = this.state;
        this.props.editPost({
            id: post.id,
            title: post.title,
            body: post.body
        });
        this.setState({ done: true })
    }
    render() {
        const { post, done } = this.state;
        return done ? <Redirect to={`/${post.category}/${post.id}`} /> : (post && post.id ? (
            <div className="row">
                <Header title="Edit Post" sorting={false} />
                <div className="col-xs-12 col-sm-6 col-sm-push-3">
                    <div className="posts">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>Post Title</label>
                                    <input required onChange={(e) => this.onInputChange('title', e)} value={post.title} type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>Post Body</label>
                                    <textarea required className="form-control" onChange={(e) => this.onInputChange('body', e)} rows="10" value={post.body}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 text-right">
                                <button onClick={this.submit} disabled={!post.author || !post.body || !post.category || !post.title} type="button" className="btn btn-primary">Submit Post</button>
                                {' '}
                                <Link className="btn btn-default" to="/">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : '')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPost: (post) => editPost(post)(dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(EditPost)