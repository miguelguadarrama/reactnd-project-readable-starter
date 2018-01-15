import { combineReducers } from 'redux'
import { ADD_COMMENT, SET_CATEGORIES, SET_POSTS, SORT_BY, VOTE, ADD_POST, SET_COMMENTS, EDIT_POST, EDIT_COMMENT, REMOVE_POST, REMOVE_COMMENT, VOTE_COMMENT } from '../actions'

const postsInitialState = {
    posts: [],
    sortBy: 'date'
}

const commentsInitialState = {
    comments: []
}

const categoriesInitialState = {
    categories: []
}

const commentData = (state = commentsInitialState, action) => {
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
            return {
                ...state,
                comments: state.comments.filter(f => f.id !== action.id)
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

const postData = (state = postsInitialState, action) => {
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
                if (p.id === action.post.id) {
                    p.title = action.post.title
                    p.author = action.post.author
                    p.category = action.post.category
                    p.body = action.post.body
                }
                return p
            });
            return {
                ...state,
                posts: posts
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

const categories = (state = categoriesInitialState, action) => {
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
    postData,
    categories,
    commentData
})