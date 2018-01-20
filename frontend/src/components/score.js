import React from 'react'

function Score(props) {
    const { post } = props;
    return (
        <div className="media-left">
            <div><a onClick={() => !post.deleted && props.onSubmitVote(post.id, 1)}><span className="glyphicon glyphicon-arrow-up"></span></a></div>
            <div>{post.voteScore}</div>
            <div><a onClick={() => !post.deleted && props.onSubmitVote(post.id, -1)}><span className="glyphicon glyphicon-arrow-down"></span></a></div>
        </div>
    )
}

export default Score