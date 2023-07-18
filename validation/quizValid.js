const { body, validationResult } = require("express-validator");
const upload= require('../middleware/uploadFiles') 

  function validate() {
    return [
      body("question")
        .isString()
        .withMessage("Please enter a valid course Qusetion"),
      body("correct_answer")
        .isString()
        .withMessage("Please enter a valid answer"),
      body("incorrect_answers"),
      body("time").isTime(),
      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }


module.exports = {validate};