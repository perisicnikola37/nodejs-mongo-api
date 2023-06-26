const Post = require("../models/postModel");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel")

const getPosts = (req, res) => {
    Post.find().then((posts) => {
        res.status(200).json({ "Posts": posts });
    });
};

const userPosts = (req, res) => {
    const { id } = req.params;

    Post.find({ user: id }).then((posts) => {
        res.status(200).json({ "User posts": posts });
    }).catch((error) => {
        console.error('Error retrieving user posts', error);
        res.status(500).send('An error occurred while retrieving user posts.');
    });
};

const createPost = async (req, res) => {
    const username = req.user.username;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({
            msg: 'User not found',
            status: 'Auth not valid'
        });
    }

    const post = new Post({
        user: user._id,
        title: req.body.title,
        content: req.body.content
    });

    await post.save();

    res.status(201).json({ post });
};

module.exports = { getPosts, userPosts, createPost };
