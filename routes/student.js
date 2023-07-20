var express = require("express");
var router = express.Router();
const {showCourses} = require('../controllers/studentController')

router.get("/:user_id", showCourses);


module.exports = router;