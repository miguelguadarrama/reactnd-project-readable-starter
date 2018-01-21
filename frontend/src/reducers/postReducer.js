import { SET_POSTS, SET_POST, SORT_BY, VOTE, ADD_POST, EDIT_POST, REMOVE_POST, UPDATE_POST_COMMENT_COUNT } from '../actions/actionTypes'

const postsInitialState = {
    posts: [],
    sortBy: 'date',
    isLoading: true
}

export const posts = (state = postsInitialState, action) => {
    let posts, post;
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
            return {
                ...state,
                posts: state.posts.filter(f => f.id !== action.id)
            }
        case EDIT_POST:
            posts = state.posts.map(p => {
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
            post = action.post;
            return {
                ...state,
                isLoading: false,
                posts: state.posts.length && state.posts.filter(p => p.id === action.post.id) ? state.posts.map(p => {
                    if (p.id === action.post.id) {
                        //update post from api
                        p = action.post
                    }
                    return p
                }) : state.posts.concat(post)
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts,
                isLoading: false
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
                    if (p.id === action.id) {
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