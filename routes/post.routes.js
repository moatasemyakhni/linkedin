const {Router} = require('express');
const {createPost, applyToPost, getApplicants} = require('../controllers/posts.controller');
const companyAuthMiddleware = require('../middlewares/company.middleware');
const router = Router();

router.post('/', companyAuthMiddleware, createPost);
router.patch('/apply_for_job', companyAuthMiddleware, applyToPost);
router.get('/', companyAuthMiddleware, getApplicants);
module.exports = router;