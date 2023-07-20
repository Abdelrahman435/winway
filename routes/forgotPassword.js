const router = require("express").Router();
const {resetPass, changePass} = require('../controllers/forgotPasswordController');

router.post('/', resetPass);
router.post('/verify', changePass);

module.exports = router;