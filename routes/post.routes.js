const {Router} = require('express');

const {createPost} = require('../controllers/posts.controller');

const router = Router();

router.post('/posts', createPost);

module.exports = router;