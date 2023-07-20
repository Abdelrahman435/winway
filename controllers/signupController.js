const bcrypt = require("bcrypt");
var passwordValidator = require("password-validator");
const jwt = require('jsonwebtoken');
var schema = new passwordValidator();
const express = require('express');
const app = express();
const { nanoid } =  require('nanoid');
const {
  getEmail,
  insertUser,
  insertOTP,
  getId,
  insertToken,
  getUser,
  getEmailInfo,
  deleteOTP
} = require("../services/signupService");
const nodemailer = require("nodemailer");
require('dotenv').config();

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
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      let otp = await Math.floor(1000 + Math.random() * 9000);
      let message = {
        from: "WINWAY",
        to: req.body.email,
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

      const d = new Date;
      d.setMinutes(d.getMinutes());
      const d2 = new Date;
      d2.setMinutes(d2.getMinutes()+1);
        
      let obj2 = {
        otp: otp,
        createdAt: Number(d),
        expiresAt: Number(d2),
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
      app.use((req,res,next)=>{
        req.headers['Authorization'] = `Bearer ${token}`;
        next();
      })
      res.status(201).json({data: obj, token});
    } else {
      return res.status(400).json({ msg: "Email already exist" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function resendOTP(req,res){
  const user = await getEmailInfo(req.body.email);
  if(user==""){
    return res.status(404).json({msg: "user not found..."})
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
  otp = bcrypt.hashSync(String(otp),10);
  await transporter
    .sendMail(message)
    .catch((error) => {
      console.log(error);
    });

  const d = new Date;
  d.setMinutes(d.getMinutes());
  const d2 = new Date;
  d2.setMinutes(d2.getMinutes()+20);
    
  let obj2 = {
    otp: otp,
    createdAt: Number(d),
    expiresAt: Number(d2),
    verified: false,
    id: user[0].id,
  };
  await deleteOTP(user[0].id);
  await insertOTP(obj2);
  res.status(201).json({msg:"OTP sent..."});
}

async function postSignupGmail(req, res) {
  try {
    if (!(await getEmail(req.user.emails[0].value))) {
      let obj = {
        firstname: req.user.name.givenName,
        lastname: req.user.name.familyName,
        email: req.user.emails[0].value,
        image: req.user.photos[0].value,
        verified: true,
        id: "gmailUser",
        password: "No password for gmail users...",
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
    if ((await getUser(req.user.id))=="") {
      let obj = {
        firstname: req.user.name.givenName,
        lastname: req.user.name.familyName,
        email: String(req.user.id),
        image: req.user.photos[0].value,
        verified: true,
        id: "facebookUser",
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
        password: "No password for gmail users...",
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

module.exports = { postSignup, postSignupGmail, postSignupFacebook, resendOTP };
