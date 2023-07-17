const bcrypt = require("bcrypt");
const { getUser } = require("../services/loginService");

async function login(req, res, next) {
  try {
    const result = await getUser(req.body.email, req.body.password);
    if (!(await bcrypt.compare(req.body.password, result[0].password))){
      return res.status(400).json({ msg: "password isn't correct" });
    }
    delete result[0].password;
    res.json(result);
  } catch (error) {
    return res.status(400).json({ msg: "The email address or mobile number you entered isn't connected to an account." });
  }
}

module.exports = { login };
