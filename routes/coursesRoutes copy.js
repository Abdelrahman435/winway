var express = require("express");
var router = express.Router();
const upload = require("../middleware/uploadFiles");
const {protect} = require('../middleware/protect');
const {
  update,
  create,
  deleteC,
  showCourse,
  showCourses,
  getCollectioName
} = require("../controllers/coursesController");
const { validate } = require("../validation/coursesValidation");

router.post(
  "/createCourse",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "videos", maxCount: 1 },
  ]),
  validate(),
  create
);

router.put(
  "/update/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "videos", maxCount: 1 },
  ]),
  validate(),
  update
);

router.delete("/deleteCourse/:id", protect, validate(), deleteC);

router.get("/getCourse/:id", protect, validate(), showCourse);

router.get("/getCourses", protect, validate(), showCourses);

router.get("/:collectionName", protect, validate(), getCollectioName);

module.exports = router;
