import { combineReducers } from 'redux'
import { SET_CATEGORIES, SET_POSTS, SORT_BY, VOTE, ADD_POST } from '../actions'

const postsInitialState = {
    posts: [],
    sortBy: 'date'
}

const categoriesInitialState = {
    categories: []
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
    categories
})