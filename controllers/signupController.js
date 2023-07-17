const bcrypt = require("bcrypt");
var passwordValidator = require("password-validator");
var schema = new passwordValidator();
const { getEmail, insertUser } = require("../services/signupService");

schema
  .is()
  .min(8)
  .is()
  .max(255)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();

async function postSignup(req, res) {
  try {
    if (! await getEmail(req.body.email)) {
      const flag = await schema.validate(req.body.password);
      if (!flag) {
        return res.status(400).json({msg: "password should contain : 1 lowercase, 1 uppercase, 2 digits, no spaces, length of 8"});
      }
      let obj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
      };
      await insertUser(obj);
      res.end();
    } else {
      return res.status(400).json({ msg: "Email already exist"});
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { postSignup };

