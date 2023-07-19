var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const upload = require("../middleware/uploadFiles");
const {
  update,
  create,
  deleteV,
  shows,
  show,
} = require("../controllers/videosController");
const { validate } = require("../validation/videosValidation");

router.post(
  "/create/:course_id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "fileName", maxCount: 1 },
  ]),
  validate(),
  create
);

router.put(
  "/update/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "fileName", maxCount: 1 },
  ]),
  validate(),
  update
);

router.delete("/delete/:id",protect, validate(), deleteV);

router.get("/show/:id",protect, validate(), show);

router.get("/shows", protect,validate(), shows);

module.exports = router;