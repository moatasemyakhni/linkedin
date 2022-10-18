const {Router} = require('express');
const {login, signup, companyInfo, updateLogo} = require('../controllers/companies.controller');

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/me', companyInfo);
router.patch('/', updateLogo);

module.exports = router;