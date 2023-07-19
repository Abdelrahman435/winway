var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const upload = require("../middleware/uploadFiles");
const {update}= require('../controllers/profileController')
const {validate} = require('../validation/profileValid')

router.put(
    "/update/:id",
    protect,
    upload.single('image'),
    validate(),
    update
  );

  module.exports = router;