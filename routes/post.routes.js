const {Router} = require('express');
const {createPost, applyToPost, getApplicants, searchForJobOffer} = require('../controllers/posts.controller');
const companyAuthMiddleware = require('../middlewares/company.middleware');
const router = Router();

router.post('/', companyAuthMiddleware, createPost);
router.patch('/apply_for_job', companyAuthMiddleware, applyToPost);
router.get('/', companyAuthMiddleware, getApplicants);
router.get('/:search', searchForJobOffer);
module.exports = router;