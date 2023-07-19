var express = require("express");
var router = express.Router();
const{addModule,getModules ,getModuleOne ,deleteM}= require("../controllers/modulesController")


router.post('/:course_id',addModule)
router.get('/:course_id',getModules )
router.get('/one/:id', getModuleOne)
router.delete('/del/:id', deleteM)


module.exports=router