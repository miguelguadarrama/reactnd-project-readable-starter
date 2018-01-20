import { getCategories } from '../utils/api'

export const [ SET_CATEGORIES ] = [ 'SET_CATEGORIES' ]

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