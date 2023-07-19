const bcrypt = require("bcrypt");
const util = require("util");
const fs = require("fs");
var passwordValidator = require("password-validator");
const {updateProfile} = require('../services/profileServics')
const {getEmail, getUser} = require('../services/signupService')
var schema = new passwordValidator();

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

async function update(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }
      if (!(await getEmail(req.body.email))) {
        const flag = await schema.validate(req.body.password);
        if (!flag) {
          return res.status(400).json({
            msg: "password should contain : 1 lowercase, 1 uppercase, 2 digits, no spaces, length of 8",
          });
        }
  
      const profile = await getUser(req.params.id);
      console.log(profile[0].id);
      if (!profile) {
        return res.status(404).json({ errors: ["User not found"] });
      }
  
      const profileObj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        gender:req.body.gender,
        birthday: req.body.birthday
      };
  
      if (req.file) {
        profileObj.image = req.file.filename;
        if (profile && profile.image) {
          fs.unlinkSync("../upload/" + profile[0].image);
        }
      }
      await updateProfile(profile[0].id, profileObj);
  
      res.status(200).json({
        msg: "Profile updated",
      });
    } else {
      return res.status(400).json({ msg: "Email already exist" });
    }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  module.exports = {update}