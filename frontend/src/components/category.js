import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/post'
import Header from './header'
import PostList from './postList'
import { sorter, capitalize } from '../utils/helpers'
import { Link } from 'react-router-dom'

class Category extends Component {
    componentDidMount() {
       this.props.fetchPosts()
    }
    render() {
        const current = this.props.match && this.props.match.params.category ? this.props.match.params.category : '';
        const category = this.props.categories ? this.props.categories.filter(c => c.path === current)[0] : {};
        let posts = this.props.posts;
        if (current !== '') {
            posts = posts.filter(p => p.category === category.path);
        }
        const { sortBy } = this.props;
        posts.sort(sorter(sortBy));
        return (
            <div className="row">
                <Header title={category && category.name ? capitalize(category.name) : 'Readable'} />
                <div className="col-xs-12">
                    <div className="form-group">
                        <Link to="/add/post" className="btn btn-xs btn-primary"><span className="glyphicon glyphicon-plus"></span> add post</Link>
                    </div>

                    <PostList posts={posts} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ posts, categories }) => {
    return {
        posts: posts.posts.filter(f => f.deleted === false),
        sortBy: posts.sortBy,
        categories: categories.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => fetchPosts()(dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)