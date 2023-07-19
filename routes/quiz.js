var express = require("express");
var router = express.Router();
const {
  update,
  create,
  deleteQ,
  showQuiz,
  showQuizs,
} = require("../controllers/quizController");
const { validate } = require("../validation/quizValid");

router.post("/createQuiz/:course_id", validate(), create);

router.put("/update/:id", validate(), update);

router.delete("/deleteQuiz/:id", validate(), deleteQ);

router.get("/getQuiz/:id", validate(), showQuiz);

router.get("/getQuizs", validate(), showQuizs);

module.exports = router;

