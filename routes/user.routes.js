const {Router} = require('express');
const {login, signup, getAllUsers} = require('../controllers/users.controller');
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/', getAllUsers);
module.exports = router;