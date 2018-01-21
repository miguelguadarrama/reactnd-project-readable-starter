const url = `http://localhost:3001`

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
    fetch(`${url}/categories`, { headers: headers })
        .catch(err => { console.error(err); return [] })
        .then(res => res.json())
        .then(data => data.categories)

export const getComments = (id) =>
    fetch(`${url}/posts/${id}/comments`, {
        headers: headers
    }).catch(err => console.error(err))
        .then(res => res.json())
        .then(data => data)

export const deletePost = (id) =>
    fetch(`${url}/posts/${id}`, {
        method: 'DELETE',
        headers: headers
    }).catch(err => console.error(err))
        .then(res => res.json())
        .then(data => data)

export const deleteComment = (id) =>
    fetch(`${url}/comments/${id}`, {
        method: 'DELETE',
        headers: headers
    }).catch(err => console.error(err))
        .then(res => res.json())
        .then(data => data)

export const editPost = (post) =>
    fetch(`${url}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).catch(err => console.error(err))
        .then(res => res.json())
        .then(data => data)

export const editComment = (comment) =>
    fetch(`${url}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).catch(err => console.error(err))
        .then(res => res.json())
        .then(data => data)

export const getPosts = () =>
    fetch(`${url}/posts`, { headers: headers })
        .catch(err => { console.error(err); return [] })
        .then(res => res.json())
        .then(data => data)

export const addPost = (post) =>
    fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).catch(err => console.warn(err))
        .then(res => res.json())
        .then(data => data)

export const addComment = (comment) =>
    fetch(`${url}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).catch(err => console.warn(err))
        .then(res => res.json())
        .then(data => data)

export const submitVote = (id, value) =>
    fetch(`${url}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: value === 1 ? 'upVote' : 'downVote'
        })
    }).catch(err => console.error(err))
        .then(res => res.json())
        .then(data => data)

export const submitCommentVote = (id, value) =>
    fetch(`${url}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: value === 1 ? 'upVote' : 'downVote'
        })
    }).catch(err => console.error(err))
        .then(res => res.json())
        .then(data => data)

export const getPost = (id) =>
    fetch(`${url}/posts/${id}`, {
        headers: headers
    }).catch(err => console.error(err))
        .then(res => res.json())
        .then(data => data)