var express = require("express");
var router = express.Router();
const {addToCart , removeFromCart}= require('../controllers/cartController')
const {protect} = require('../middleware/protect');


router.post('/:courseId/:studentId',protect,addToCart)
router.get('/remove/:courseId/:studentId',protect,removeFromCart)









module.exports=router