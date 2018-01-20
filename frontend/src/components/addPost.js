import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Header from './header'
import { connect } from 'react-redux'
import { addPost } from '../actions/post'
import pushid from 'pushid'

class AddPostComponent extends Component {
    state = {
        category: '',
        title: '',
        body: '',
        author: '',
        done: false
    }
    onInputChange(input, event) {
        const obj = {};
        obj[input] = event.target.value;
        this.setState(obj);
    }
    submit = () => {
        const { title, body, category, author } = this.state; 
        const post = {
            id: pushid(),
            title,
            body,
            category,
            author,
            timestamp: Date.now(),
            voteScore: 0,
            deleted: false
        };
        this.props.submitPost(post);
        this.setState({done: true})
        //this.props.submitPost(title, body, category, author);
    }
    render() {
        const { title, body, category, author, done } = this.state;
        const { categories } = this.props;
        return done ? <Redirect to='/' /> : (
            <div className="row">
                <Header title="Add Post" sorting={false} />
                <div className="col-xs-12 col-sm-6 col-sm-push-3">
                    <div className="posts">
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select onChange={(e) => this.onInputChange('category', e)} className="form-control" required>
                                        <option value="">Select one</option>
                                        {categories && categories.map(c => (
                                            <option key={c.path} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>Post Title</label>
                                    <input required onChange={(e) => this.onInputChange('title', e)} value={title} type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>Post Body</label>
                                    <textarea required className="form-control" onChange={(e) => this.onInputChange('body', e)} rows="10" value={body}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>Author</label>
                                    <input required onChange={(e) => this.onInputChange('author', e)} value={author} type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 text-right">
                                <button onClick={this.submit} disabled={!author || !body || !category || !title} type="button" className="btn btn-primary">Submit Post</button>
                                {' '}
                                <Link className="btn btn-default" to="/">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ categories }) => {
    return {
        categories: categories.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitPost: (post) => dispatch(addPost(post))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostComponent)