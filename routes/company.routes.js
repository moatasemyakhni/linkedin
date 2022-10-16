const {Router} = require('express');
const {login, signup, companyInfo} = require('../controllers/companies.controller');

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/me', companyInfo);

module.exports = router;