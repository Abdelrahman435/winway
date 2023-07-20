var express = require("express");
var router = express.Router();
const {addVideoWatched }= require('../controllers/videoWatchedCont')
const {protect} = require('../middleware/protect');


router.post('/:course_id/:user_id/:videos_id',addVideoWatched)


module.exports=router