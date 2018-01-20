import * as Api from '../utils/api'
import { UpdatePostCommentCount } from './post'

export const [ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT, SET_COMMENTS, VOTE_COMMENT]
    = ['ADD_COMMENT', 'EDIT_COMMENT', 'REMOVE_COMMENT', 'SET_COMMENTS', 'VOTE_COMMENT'];

const AddCommentAction = (comment) => {
    return {
        comment,
        type: ADD_COMMENT
    }
}

const DeleteCommentAction = (id, parentId) => {
    return {
        id,
        parentId,
        type: REMOVE_COMMENT
    }
}

const EditCommentAction = ({ id, body, timestamp }) => {
    console.log(id, body, timestamp)
    return {
        type: EDIT_COMMENT,
        id,
        body,
        timestamp
    }
}

const VoteComment = (id, value) => {
    return {
        type: VOTE_COMMENT,
        id,
        value
    }
}

const SetComments = (comments) => {
    return {
        type: SET_COMMENTS,
        comments
    }
}

export const addComment = (comment) => dispatch => (
    Api.addComment(comment)
        .then(data => {
            dispatch(AddCommentAction(comment))
            dispatch(UpdatePostCommentCount(comment.parentId, 1))
        })
)

export const editComment = (comment) => dispatch => (
    Api.editComment(comment)
        .then(data => { dispatch(EditCommentAction(data)); dispatch() })
)

export const deleteComment = (id, parentId) => dispatch => (
    Api.deleteComment(id)
        .then(data => { dispatch(DeleteCommentAction(id, parentId)); dispatch(UpdatePostCommentCount(parentId)) })
)

export const voteComment = (id, value) => dispatch => (
    Api.submitCommentVote(id, value)
        .then(data => dispatch(VoteComment(id, value)))
)

export const fetchComments = id => dispatch => (
    Api.getComments(id)
       .then(comments => dispatch(SetComments(comments)))
)

/*
export const fetchTodos = () => dispatch => (
  TodoAPIUtil
      .fetchTodos()
      .then(todos => dispatch(receiveTodos(todos)))
);
*/