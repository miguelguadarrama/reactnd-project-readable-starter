import React, { Component } from 'react'
import PostItem from './postItem'

class PostList extends Component {
    render() {
        const { posts } = this.props;
        return (
            <ul className="media-list posts">
                {posts && posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        )
    }
}

export default PostList