const {Router} = require('express');
const {createPost, applyToPost, getApplicants, searchForJobOffer, isUserApplied} = require('../controllers/posts.controller');
const companyAuthMiddleware = require('../middlewares/company.middleware');
const userAuthMiddleware = require('../middlewares/user.middleware');
const router = Router();

router.post('/', companyAuthMiddleware, createPost);
router.patch('/apply_for_job', userAuthMiddleware, applyToPost);
router.get('/', companyAuthMiddleware, getApplicants);
router.get('/:search', searchForJobOffer);
router.post('/is_applied', userAuthMiddleware, isUserApplied);
module.exports = router;