var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const {
  update,
  create,
  deleteQ,
  showQuiz,
  showQuizs,
} = require("../controllers/quizController");
const { validate } = require("../validation/quizValid");

router.post("/createQuiz/:course_id", protect, validate(), create);

router.put("/update/:id", protect,validate(), update);

router.delete("/deleteQuiz/:id", protect,validate(), deleteQ);

router.get("/getQuiz/:id", protect,validate(), showQuiz);

router.get("/getQuizs", protect,validate(), showQuizs);

module.exports = router;

