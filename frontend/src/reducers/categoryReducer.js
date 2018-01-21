import { SET_CATEGORIES } from '../actions/actionTypes'

export const categories = (state = { categories: [] }, action) => {
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