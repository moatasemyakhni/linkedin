const Post = require('../models/Post');

const createPost = (req, res) => {
    const company_id = req.body._id;
    const content = req.body.content;

    const post = new Post();
    post.company_id = company_id;
    post.content = content;
    post.save();
}