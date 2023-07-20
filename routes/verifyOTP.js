const router = require("express").Router();
const {verifyUser} = require('../controllers/verifyController');
const {protect} = require('../middleware/protect');

router.post('/', protect, verifyUser);


module.exports = router;