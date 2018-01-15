export const [ADD_POST, REMOVE_POST, VOTE, EDIT_POST, SET_POSTS, ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT, SET_CATEGORIES, SORT_BY, SET_CURRENT, SET_COMMENTS, VOTE_COMMENT] 
           = ['ADD_POST', 'REMOVE_POST', 'VOTE', 'EDIT_POST', 'SET_POSTS', 'ADD_COMMENT', 'EDIT_COMMENT', 'REMOVE_COMMENT', 'SET_CATEGORIES', 'SORT_BY', 'SET_CURRENT', 'SET_COMMENTS', 'VOTE_COMMENT']

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

export const AddCommentAction = (comment) => {
    return {
        comment,
        type: ADD_COMMENT
    }
}

export const DeletePostAction = (id) => {
    return {
        id,
        type: REMOVE_POST
    }
}

export const DeleteCommentAction = (id) => {
    return {
        id,
        type: REMOVE_COMMENT
    }
}

export const EditPostAction = (post) => {
    return {
        ...post,
        type: EDIT_POST
    }
}

export const EditCommentAction = (id, body, timestamp) => {
    return {
        type: EDIT_COMMENT,
        id,
        body,
        timestamp
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

export const VoteComment = (id, value) => {
    return {
        type: VOTE_COMMENT,
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

export const SetComments = (comments) => {
    return {
        type: SET_COMMENTS,
        comments
    }
}
