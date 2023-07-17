var express = require("express");
var router = express.Router();
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
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "fileName", maxCount: 1 },
  ]),
  validate(),
  create
);

router.put(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "fileName", maxCount: 1 },
  ]),
  validate(),
  update
);

router.delete("/delete/:id", validate(), deleteV);

router.get("/show/:id", validate(), show);

router.get("/shows", validate(), shows);

module.exports = router;

// upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "videos", maxCount: 1 },
// ]),
