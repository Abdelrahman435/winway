var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const{addReview,getReview ,getReviewOne ,delet}= require("../controllers/ReviewController")
//const{validate}=require("../validation/ReviewValidation");
//var validators = require('../validation/');
const { validate, ValidationError, Joi } = require('express-validation')
const reviewValidation = {
    body: Joi.object({
      body: Joi.string().required(),
      rating: Joi.number().integer().min(1).max(5).required(),
    }),
  }

router.post('/:studentId/:courseId',protect,validate(reviewValidation, {}, {}),addReview)
router.get('/:courseId',protect,getReview )
router.get('/one/:id',protect, getReviewOne)
router.delete('/del/:id',protect, delet)


module.exports=router