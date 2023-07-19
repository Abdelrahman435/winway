var express = require('express');
var router = express.Router();
const {login} = require('../controllers/loginController');
const {validate} = require('../validation/login_validation');

router.post('/', validate(), login);
// router.get('/facebook', loginFacebook);

module.exports = router;
