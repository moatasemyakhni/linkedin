const {Router} = require('express');

const {createPost, applyToPost, getApplicants} = require('../controllers/posts.controller');

const router = Router();

router.post('/', createPost);
router.patch('/apply_for_job', applyToPost);
router.get('/', getApplicants);
module.exports = router;