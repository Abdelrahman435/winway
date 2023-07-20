const {
  getEmail,
  insertUser,
  insertOTP,
  getId,
  insertToken,
  getUser,
  getEmailInfo,
  deleteOTP,
  verify,
  getOTP,
} = require("../services/signupService");
const nodemailer = require("nodemailer");
const { nanoid } = require("nanoid");
var passwordValidator = require("password-validator");
var schema = new passwordValidator();
const bcrypt = require('bcrypt');
const { resetPassword } = require("../services/changePasswordServices");

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

async function resetPass(req, res) {
  const user = await getEmailInfo(req.body.email);
  if (user == "") {
    return res.status(404).json({ msg: "user not found..." });
  }
  if (user[0].id=="gmailUser" || user[0].id=="facebookUser"){
    return res.status(400).json({msg:"can't set password for gmail or facebook accounts"});
  }
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let otp = await Math.floor(1000 + Math.random() * 9000);
  let message = {
    from: "WINWAY",
    to: req.body.email,
    subject: "Verify",
    text: `Your OTP is ${otp}`,
    html: `<p>otp is<br> <h1>${otp}</h1><br><h3>Your code will expire in 20 minutes</h3></p>`,
  };
  otp = bcrypt.hashSync(String(otp), 10);
  await transporter.sendMail(message).catch((error) => {
    console.log(error);
  });

  const d = new Date();
  d.setMinutes(d.getMinutes());
  const d2 = new Date();
  d2.setMinutes(d2.getMinutes() + 20);

  let obj2 = {
    otp: otp,
    createdAt: Number(d),
    expiresAt: Number(d2),
    verified: false,
    id: user[0].id,
  };
  await deleteOTP(user[0].id);
  await insertOTP(obj2);
  ////////////////
  res.status(200).json({ msg: "pending for verification.." });
}

async function changePass(req, res) {
  const user = await getEmailInfo(req.body.email);
  const otp = await getOTP(user[0].id);
  let d = new Date();
  if (otp == "") {
    return res.status(404).json({ msg: "No OTP was sent..." });
  }
  if (!(await bcrypt.compare(req.body.otp, otp[0].otp))) {
    return res.status(401).json({ msg: "Authentication failed..." });
  }
  if (!(Number(d) < Number(otp[0].expiresAt))) {
    return res
      .status(400)
      .json({ msg: "OTP has expired, please try again..." });
  }
  const state = await verify(user[0].id);
  if (!state) {
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
  const flag = await schema.validate(req.body.newPass);
  if (!flag) {
      return res.status(400).json({
          msg: "password should contain : 1 lowercase, 1 uppercase, 2 digits, no spaces, length of 8",
        });
    }
    const newPass = await bcrypt.hashSync(req.body.newPass, 10);
    const state2 = await resetPassword(newPass, user[0].id);
    if (!state2) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
    await deleteOTP(user[0].id);
    message = {
        from: "WINWAY",
        to: req.body.email,
        subject: "Password changed",
        text: `Your password has been changed if you didn't make any changes please contact us with any identity confirmation for the reset`,
        html: `<h1>Your password has been changed</h1> <br> if you didn't make any changes please contact us with any identity confirmation for the reset`,
    };
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "Gmail",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
    await transporter.sendMail(message).catch((error) => {
        console.log(error);
    });
    res.status(200).json({ msg: "password changed successfully..." });
}
module.exports = { resetPass , changePass};
