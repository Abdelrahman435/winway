const util = require("util");
const fs = require("fs");
const {
  getQuizById,
  updateQuiz,
  createQuiz,
  deleteQuiz,
  showquizs,
} = require("../services/quizService");
const{getCourseById} = require('../services/coursesServices')

async function update(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }

    const quiz = await getQuizById(req.params.id);
    if (!quiz[0]) {
      return res.status(404).json({ errors: ["Quiz not found"] });
    }

    const quizObj = {
      question: req.body.question,
      correct_answer: req.body.correct_answer,
      incorrect_answers: req.body.incorrect_answer,
      time: req.body.time,
    };

    await updateQuiz(quiz[0].id, quizObj);

    res.status(200).json({
      msg: "quiz updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function create(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }
    let id = req.params.course_id
    console.log(id);
    let course = getCourseById(id)
    if(!course.length>0){
      res.status(404).json({errors: "course not found"});
    }

    // INSERT NEW Qiuz
    const quizData = {
        question: req.body.question,
        correct_answer: req.body.correct_answer,
        incorrect_answers: req.body.incorrect_answers,
        time: req.body.time,
        course_id: id
    };

    await createQuiz(quizData);

    res.status(200).json({
      msg: "Quiz created successfully",
    });
  } catch (err) {
    // console.error(err);
    // res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function deleteQ(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }

    const quiz = await getQuizById(req.params.id);
    if (!quiz[0]) {
      return res.status(404).json({ errors: ["Quiz not found"] });
    }

    await deleteQuiz(quiz[0].id);

    res.status(200).json({
      msg: "Quiz Deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function showQuizs(req, res) {
  try {
    let quizs;
    
      quizs = await showquizs();
    if (quizs) {
      res.status(200).json(quizs);
    } else {
      res.status(404).json({ errors: ["No Quizs found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function showQuiz(req, res) {
  try {
    const quiz = await getQuizById(req.params.id);
    if (!quiz[0]) {
      return res.status(404).json({ errors: ["Quiz not found"] });
    }

    if (quiz) {
      res.status(200).json(quiz)
    } else {
      res.status(404).json({ errors: ["No Quizs found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}


module.exports = {
  update,
  create,
  deleteQ,
  showQuizs,
  showQuiz,
};
