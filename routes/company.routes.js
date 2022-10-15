const {Router} = require('express');
const {login, signup} = require('../controllers/companies.controller');
const companyAuthMiddleware = require('../middlewares/company.middleware');

const router = Router();

router.post('/login', companyAuthMiddleware, login);
router.post('/signup', companyAuthMiddleware, signup);

module.exports = router;