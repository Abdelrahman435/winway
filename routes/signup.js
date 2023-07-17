var express = require('express');
var router = express.Router();
const {validate} = require('../validation/signup_validation');
const {postSignup} = require('../controllers/signupController');


router.post('/', validate(), postSignup);

module.exports = router;
