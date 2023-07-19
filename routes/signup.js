var express = require('express');
var router = express.Router();
const {validate} = require('../validation/signup_validation');
const {postSignup, postSignupGmail, postSignupFacebook} = require('../controllers/signupController');


router.post('/', validate(), postSignup);
router.get('/gmail', postSignupGmail);
router.get('/facebook', postSignupFacebook);

module.exports = router;
