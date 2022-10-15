const {Router} = require('express');
const {login, signup, getAllUsers, updateProfilePicture, followCompany} = require('../controllers/users.controller');
const userAuthMiddleware = require('../middlewares/user.middleware');
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/', userAuthMiddleware, getAllUsers);
router.patch('/', userAuthMiddleware, updateProfilePicture);
router.patch('/follow_company', userAuthMiddleware, followCompany);
module.exports = router;