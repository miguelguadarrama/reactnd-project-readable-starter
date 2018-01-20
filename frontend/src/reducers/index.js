import { combineReducers } from 'redux'
import { SET_POSTS, SET_POST, SORT_BY, VOTE, ADD_POST, EDIT_POST, REMOVE_POST, UPDATE_POST_COMMENT_COUNT } from '../actions/post'
import { ADD_COMMENT, SET_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT, VOTE_COMMENT } from '../actions/comment'
import { SET_CATEGORIES } from '../actions/categories'

const postsInitialState = {
    posts: [],
    categories: [],
    sortBy: 'date'
}

const commentsInitialState = {
    comments: []
}

const comments = (state = commentsInitialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.comment)
            }
        case REMOVE_COMMENT:
            /* normally I would do comments.filter() and take out the deleted comment, but I want to replicate
               reddit's [deleted] behavior here! */
            return {
                ...state,
                comments: state.comments.map(f => {
                    if(f.id === action.id){
                        f.body = "[deleted]"
                        f.deleted = true
                    }
                    return f;
                })
            }
        case VOTE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c => {
                    if(c.id === action.id){
                        c.voteScore += action.value;
                    }
                    return c;
                })
            }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c => {
                    if (c.id === action.id) {
                        c.body = action.body
                    }
                    return c;
                })
            }
        default:
            return state;
    }
}

const posts = (state = postsInitialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat({
                    body: action.body,
                    title: action.title,
                    category: action.category,
                    timestamp: action.timestamp,
                    id: action.id,
                    author: action.author,
                    voteScore: 0,
                    deleted: false
                })
            }
        case REMOVE_POST:
            console.log("state before", state);
            console.log("after", {
                ...state,
                posts: state.posts.filter(f => f.id !== action.id)
            })
            return {
                ...state,
                posts: state.posts.filter(f => f.id !== action.id)
            }
        case EDIT_POST:
            const posts = state.posts.map(p => {
                if (p.id === action.id) {
                    p.title = action.title
                    p.author = action.author
                    p.category = action.category
                    p.body = action.body
                }
                return p
            });
            return {
                ...state,
                posts: posts
            }
        case SET_POST:
            const post = action.post;
            return {
                ...state,
                posts: state.posts.length && state.posts.filter(p => p.id === action.post.id) ? state.posts.map(p => {
                    if(p.id === action.post.id){
                        p = action.post
                    }
                    return p
                }) : state.posts.concat(post)
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case SORT_BY:
            return {
                ...state,
                sortBy: action.sort
            }
        case UPDATE_POST_COMMENT_COUNT:
            return {
                ...state,
                posts: state.posts.map(p => {
                    if(p.id === action.id){
                        p.commentCount += action.value
                    }
                    return p
                })
            }
        case VOTE:
            return {
                ...state,
                posts: state.posts.map(p => {
                    if (p.id === action.id) {
                        p.voteScore += action.value;
                    }
                    return p;
                })
            }
        default:
            return state
    }
}

const categories = (state = postsInitialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
    categories,
    comments
})