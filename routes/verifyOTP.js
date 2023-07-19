const router = require("express").Router();
const {verifyUser} = require('../controllers/verifyController');

router.post('/', verifyUser);


module.exports = router;