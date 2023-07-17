const { body, validationResult } = require("express-validator");
const upload= require('../middleware/uploadFiles') 

  function validate() {
    return [
      body("name")
        .isString()
        .withMessage("Please enter a valid course name"),
      body("description")
        .isString()
        .withMessage("Please enter a valid description")
        .isLength({ min: 20 })
        .withMessage("Description must be at least 20 characters"),
      body("duraions"),
      body("price"),
      body("mentor_id"),
      body("features"),
      body("collectionName"),
      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }


module.exports = {validate};