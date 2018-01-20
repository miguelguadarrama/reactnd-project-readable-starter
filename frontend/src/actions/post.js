import * as Api from '../utils/api'
export const [SET_POSTS, SET_POST, ADD_POST, EDIT_POST, REMOVE_POST, VOTE, SORT_BY, UPDATE_POST_COMMENT_COUNT]
    = ['SET_POSTS', 'SET_POST', 'ADD_POST', 'EDIT_POST', 'REMOVE_POST', 'VOTE', 'SORT_BY', 'UPDATE_POST_COMMENT_COUNT']


const AddPost = (post) => {
    return {
        type: ADD_POST,
        id: post.id,
        title: post.title,
        body: post.body,
        category: post.category,
        author: post.author,
        timestamp: post.timestamp
    }
}

const DeletePostAction = (id) => {
    return {
        id,
        type: REMOVE_POST
    }
}

const EditPostAction = (post) => {
    return {
        ...post,
        type: EDIT_POST
    }
}

export const UpdatePostCommentCount = (id, value = -1) => {
    return {
        id,
        value,
        type: UPDATE_POST_COMMENT_COUNT
    }
}

const SetPosts = (posts) => {
    return {
        type: SET_POSTS,
        posts
    }
}

export const SortBy = (sort) => {
    return {
        type: SORT_BY,
        sort
    }
}

const Vote = (id, value) => {
    return {
        type: VOTE,
        id,
        value
    }
}

const SetPost = (post) => {
    return {
        type: SET_POST,
        post
    }
}

export const addPost = (post) => dispatch => (
    Api.addPost(post)
        .then(data => dispatch(AddPost(data)))
)

export const deletePost = id => dispatch => (
    Api.deletePost(id)
        .then(data => dispatch(DeletePostAction(id)))
)

export const editPost = (post) => dispatch => (
    Api.editPost(post)
        .then(data => dispatch(EditPostAction(post)))
)

export const votePost = (id, value) => dispatch => (
    Api.submitVote(id, value)
        .then(data => dispatch(Vote(id, value)))
)

export const fetchPosts = (posts) => dispatch => (
    Api.getPosts()
        .then(data => dispatch(SetPosts(data)))
)

export const fetchPost = (id) => dispatch => (
    Api.getPost(id)
        .then(data => dispatch(SetPost(data)))
)