const {Router} = require('express');

const {createPost} = require('../controllers/posts.controller');

const router = Router();

router.post('/', createPost);

module.exports = router;