import { ADD_COMMENT, SET_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT, VOTE_COMMENT } from '../actions/actionTypes'

export const comments = (state = { comments: [] }, action) => {
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
                    if (f.id === action.id) {
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
                    if (c.id === action.id) {
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