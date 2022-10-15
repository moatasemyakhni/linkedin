const {Router} = require('express');
const {login, signup, getAllUsers, updateProfilePicture, followCompany} = require('../controllers/users.controller');
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/', getAllUsers);
router.patch('/', updateProfilePicture);
router.patch('/follow_company', followCompany);
module.exports = router;