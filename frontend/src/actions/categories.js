import { getCategories } from '../utils/api'
import { SET_CATEGORIES } from './actionTypes'

const SetCategoriesAction = (categories) => {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

export const fetchCategories = () => dispatch => (
    getCategories()
        .then(categories => dispatch(SetCategoriesAction(categories)))
)