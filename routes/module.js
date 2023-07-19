var express = require("express");
var router = express.Router();
const{addModule,getModules ,getModuleOne ,deleteM}= require("../controllers/modulesController")
const {protect} = require('../middleware/protect');


router.post('/:course_id', protect,addModule)
router.get('/:course_id', protect,getModules )
router.get('/one/:id', protect,getModuleOne)
router.delete('/del/:id', protect, deleteM)


module.exports=router