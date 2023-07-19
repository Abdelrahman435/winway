const bcrypt = require("bcrypt");
const { getUser, isVerified } = require("../services/loginService");
const {
  getId,
} = require("../services/signupService");
const jwt = require('jsonwebtoken');


async function login(req, res, next) {
  try {
    const result = await getUser(req.body.email, req.body.password);
    if (!(await bcrypt.compare(req.body.password, result[0].password))){
      return res.status(400).json({ msg: "password isn't correct" });
    }
    delete result[0].password;
    if(!result[0].verified){
      return res.status(401).json({msg:"your account needs to be verified..."});
    }
    const id = await getId(req.body.email);
    const token = await jwt.sign({userId: id}, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME
      })
    res.status(200).json({data: result, token});
  } catch (error) {
    return res.status(400).json({ msg: "The email address or mobile number you entered isn't connected to an account." });
  }
}

module.exports = { login };
