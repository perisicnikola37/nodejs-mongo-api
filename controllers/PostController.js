const Post = require("../models/postModel");

const getPosts = (req, res) => {
    Post.find().then((posts) => {
        res.status(200).json({ "Posts": posts })
    })
};

module.exports = { getPosts };
