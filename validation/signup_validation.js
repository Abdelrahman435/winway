const { body, validationResult } = require('express-validator');

function validate() {
  // console.log('flag');
  try {
    return [
      body("firstname")
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('Please enter a valid first name'),

      body("lastname")
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('Please enter a valid last name'),

      body("email")
        .isEmail()
        .withMessage('Please enter a valid email'),

      body("password"),
        

      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        next();
      }
    ]
  } catch (error) {
    console.log(error);
  }
}

module.exports = { validate };