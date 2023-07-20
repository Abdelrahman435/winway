var express = require('express');
var router = express.Router();
const {login, facebookLogin, gmailLogin} = require('../controllers/loginController');
const {validate} = require('../validation/login_validation');
const {protect} = require('../middleware/protect');

router.post('/', validate(), login);
router.get('/facebook', facebookLogin);
router.get('/google', gmailLogin);

router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        error: true,
        message: "log in failure",
    })
});


module.exports = router;
