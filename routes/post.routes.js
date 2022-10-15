const {Router} = require('express');

const {createPost, applyToPost} = require('../controllers/posts.controller');

const router = Router();

router.post('/', createPost);
router.post('/apply_for_job', applyToPost);

module.exports = router;