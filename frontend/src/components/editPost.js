import React, { Component } from 'react'
import Header from './header'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Api from '../utils/api'
import { EditPostAction } from '../actions'

class EditPost extends Component {
    state = {
        post: {},
        done: false
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        Api.getPost(id)
            .then(data => {
                this.setState({ post: data })
            }).catch(() => this.setState({ post: {} }))
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
        Api.editPost(post).then(data => {
            this.setState({ done: true })
        })
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

const mapStateToProps = () => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPost: (post) => EditPostAction(post)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPost)