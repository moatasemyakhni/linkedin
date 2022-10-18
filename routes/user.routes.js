const {Router} = require('express');
const {login, signup, getAllUsers, updateProfilePicture, followCompany, unFollowCompany, userInfo, getCompanies} = require('../controllers/users.controller');
const userAuthMiddleware = require('../middlewares/user.middleware');
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/', userAuthMiddleware, getAllUsers);
router.post('/me', userInfo);
router.patch('/', userAuthMiddleware, updateProfilePicture);
router.patch('/follow_company', userAuthMiddleware, followCompany);
router.patch('/unfollow_company', userAuthMiddleware, unFollowCompany);
router.post('/company',getCompanies);
module.exports = router;