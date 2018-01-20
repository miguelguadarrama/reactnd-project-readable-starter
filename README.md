# Miguel's Readable app

This is my project submission for the React Nanodegree module 2: React+Redux

Below you will find instructions for installing and running the project.

> Note: I wanted to extend functionality just a bit, more on that below.

## Changes to the original project

1. You can reply to comments, and they will be shown nested below its parent's comment.
2. Instead of removing comments (e.g disappearing), when you delete a comment it will change its body to [deleted] to mimic reddit's behavior somewhat. The property "deleted" will still be set to true, but I don't filter them out of the comment thread, instead just modify their body to show "[deleted]" replacing the old comment. Of course, in real life the old comment body would not be replaced for auditing purposes. The reason for this [deleted] behavior is mostly because I implemented threaded comments, so deleting a parent comment would also make all child comments disappear. I hope this is ok for this project.
3. In line with previous list item, I made it so deleted comments don't count to the post's commentCount. So a deleted comment will be shown as "[deleted]" but will also trigger a re-count of post's commentCount. Also, deleted comments won't allow to vote on them or reply them.


## Installing

### API Server

To install and start the API server, run the following commands in this directory:

* `npm install`
* `node server`

### Frontend

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

* `npm install`
* `npm start`