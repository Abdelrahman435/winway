const { body, validationResult } = require("express-validator");
const upload= require('../middleware/uploadFiles') 

  function validate() {
    return [
      body("name")
        .isString()
        .withMessage("Please enter a valid course name"),

      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }


module.exports = {validate};