export const [ADD_POST, REMOVE_POST, VOTE, EDIT_POST, SET_POSTS, ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT, SET_CATEGORIES, SORT_BY, SET_CURRENT] 
           = ['ADD_POST', 'REMOVE_POST', 'VOTE', 'EDIT_POST', 'SET_POSTS', 'ADD_COMMENT', 'EDIT_COMMENT', 'REMOVE_COMMENT', 'SET_CATEGORIES', 'SORT_BY', 'SET_CURRENT']

export const AddPost = (post) => {
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

export const SetCategories = (categories) => {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

export const SetPosts = (posts) => {
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

export const Vote = (id, value) => {
    return {
        type: VOTE,
        id,
        value
    }
}

export const SetCurrent = (value) => {
    return {
        type: SET_CURRENT,
        value
    }
}
