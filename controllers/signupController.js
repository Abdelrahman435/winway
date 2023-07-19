const bcrypt = require("bcrypt");
var passwordValidator = require("password-validator");
const jwt = require('jsonwebtoken');
var schema = new passwordValidator();
const { nanoid } =  require('nanoid');
const {
  getEmail,
  insertUser,
  insertOTP,
  getId,
  insertToken,
  getUser
} = require("../services/signupService");
const nodemailer = require("nodemailer");

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
    if (!(await getEmail(req.body.email))) {
      const flag = await schema.validate(req.body.password);
      if (!flag) {
        return res.status(400).json({
          msg: "password should contain : 1 lowercase, 1 uppercase, 2 digits, no spaces, length of 8",
        });
      }
      const nId = nanoid(10);
      let obj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        id: nId,
        verified: false,
      };
      ////////////////////////////
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "Gmail",
        port: 587,
        secure: false,
        auth: {
          user: "joeshirf@gmail.com",
          pass: "jxakoskentdzrkde",
        },
      });

      let otp = await Math.floor(1000 + Math.random() * 9000);
      console.log(otp);
      let message = {
        from: "WINWAY",
        to: /*req.body.email*/"hamo.hegazi2@gmail.com",
        subject: "Verify",
        text: `otp is ${otp}`,
        html: `<p>otp is<br> <h1>${otp}</h1></p>`,
      };
      
      otp = bcrypt.hashSync(String(otp),10);
      await transporter
        .sendMail(message)
        .catch((error) => {
          console.log(error);
        });
      let obj2 = {
        otp: otp,
        createdAt: new Date(),
        expiresAt: new Date(),
        verified: false,
        id: nId,
      };
      await insertOTP(obj2);
      ////////////////////////////
      await insertUser(obj);
      const id = await getId(obj.email);
      const token = await jwt.sign({userId: id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
      })
      res.status(201).json({data: obj, token});
    } else {
      return res.status(400).json({ msg: "Email already exist" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function postSignupGmail(req, res) {
  try {
    if (!(await getEmail(req.user.emails[0].value))) {
      let obj = {
        firstname: req.user.name.givenName,
        lastname: req.user.name.familyName,
        email: req.user.emails[0].value,
        image: req.user.photos[0].value,
      };
      await insertUser(obj);
      const id = await getId(obj.email);
      const token = await jwt.sign({userId: id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
      })
      res.status(201).json({data: obj, token});
    }
    else{
      let obj = {
        firstname: req.user.name.givenName,
        lastname: req.user.name.familyName,
        email: req.user.emails[0].value,
        image: req.user.photos[0].value,
      };
      const id = await getId(obj.email);
      const token = await jwt.sign({userId: id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
      })
      res.status(201).json({data: obj, token});    
    }
  } catch (error) {
    console.log(error);
  }
}

async function postSignupFacebook(req, res) {
  try {
    console.log(await getUser(req.user.id));
    if (!(await getUser(req.user.id))) {
      let obj = {
        firstname: req.user.name.givenName,
        lastname: req.user.name.familyName,
        email: req.user.id,
        image: req.user.photos[0].value,
      };
      await insertUser(obj);
      const id = await getId(obj.email);
      const token = await jwt.sign({userId: id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
      })
      res.status(201).json({data: obj, token});
    }
    else{
      let obj = {
        firstname: req.user.name.givenName,
        lastname: req.user.name.familyName,
        email: req.user.id,
        image: req.user.photos[0].value,
      };
      const id = await getId(obj.email);
      const token = await jwt.sign({userId: id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
      })
      res.status(201).json({data: obj, token});
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { postSignup, postSignupGmail, postSignupFacebook };
