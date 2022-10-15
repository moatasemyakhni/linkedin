const Post = require('../models/Post');

const createPost = async (req, res) => {
    const company_id = req.body._id;
    const content = req.body.content;
    try {
        const post = new Post();
        post.company_id = company_id;
        post.content = content;
        await post.save();
        res.status(200).json({
            post: post
        });
    }catch(err) {
        res.json({
            "message": "insert failed",
            "error": err.message
        });
    }
}

const applyToPost = async (req, res) => {
    const post_id = req.body.post_id;
    const user_id = req.body.user_id;

    try {
        const post = await Post.findById(post_id);
        post.applied_users.push(user_id);
        await post.save();
        send.res(post);
    }catch(err) {
        res.json({
            "message": "error",
            "error": err.message,
        })
    }
}
module.exports = {
    createPost,
}