const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "894tuq4ut84ut8v4t89999g": {
    id: '894tuq4ut84ut8v4t89999g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    parentPostId: "894tuq4ut84ut8v4t8wun89g",
    timestamp: 1468166872634,
    body: 'Hi there! I am a NESTED COMMENT! No way!',
    author: 'thingtwo',
    voteScore: 100,
    deleted: false,
    parentDeleted: false
  },
  "894tuq4ut84t99g": {
    id: '894tuq4ut84t99g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    parentPostId: "894tuq4ut84ut8v4t89999g",
    timestamp: 1468166875634,
    body: 'Hi there! I am a NESTED NESTED COMMENT! No way!',
    author: 'thingtwo',
    voteScore: 500,
    deleted: false,
    parentDeleted: false
  },
  "894tuq4ut84t91211119g": {
    id: '894tuq4ut84t91211119g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    parentPostId: "894tuq4ut84t99g",
    timestamp: 1468166875934,
    body: 'Hi there! I am a NESTED NESTED COMMENT! No way!',
    author: 'thingtwo',
    voteScore: 784,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "-1": {
    id: '-1',
    parentId: "1",
    timestamp: 1516456121670,
    body: 'This is a normal comment',
    author: 'Steve Work',
    voteScore: 50,
    deleted: false,
    parentDeleted: false
  },
  "-2": {
    id: '-2',
    parentId: "1",
    parentPostId: "-1",
    timestamp: 1516456141670,
    body: 'This is a reply comment! Yes!!',
    author: 'Billy Gates',
    voteScore: 150,
    deleted: false,
    parentDeleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId)// && !comments[key].deleted
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? comments[id]//{}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      parentPostId: comment.parentPostId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      comments[id].body = "[deleted]"
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
