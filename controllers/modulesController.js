const util = require("util")
const fs = require("fs")
const{createModule , getModuleById ,deletModule , getmoduls}=require("../services/moduleServices")
const { getCourseById } = require("../services/coursesServices")


async function addModule (req,res){
    try{
       
        const course = await getCourseById(req.params.course_id)

        if(!course.length > 0){
            return res.status(404).json({errors: ["Course not found"]})
        }
        const moduleObj={
            name:req.body.name,
            size:req.body.size,
            course_id: course[0].id
        };
        await createModule(moduleObj)
        res.status(200).json({
            msg: "Module created",
          });
    }catch (err) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
      }
}

async function getModules (req,res){
    try {
        const modules = await getmoduls(req.params.course_id)
        res.status(200).json(modules);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
    }
}
async function getModuleOne (req,res){
    try {
        const module = await getModuleById(req.params.id)
        if(!module.length > 0){
            return res.status(404).json({ errors: ["Module not found"] });
        }
        res.status(200).json(module);

    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
    }
}
async function deleteM(req,res){
    try {
      
        const module = await getModuleById(req.params.id)
        if(!module.length > 0){
            res.status(404).json({ errors: ["module not found"] });
        }
        await deletModule(module[0].id)
        res.status(200).json({ msg: "Module Deleted successfully",});

    } catch (err) {
        // console.error(err);
        // res.status(500).json({ errors: ["Internal server error"] });
    }
}
module.exports={addModule , getModules , getModuleOne , deleteM}