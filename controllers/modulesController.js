const util = require("util")
const fs = require("fs")
const{createModule , getModuleById ,deletModule , getmoduls, getVideos}=require("../services/moduleServices")
const { getCourseById } = require("../services/coursesServices")


async function addModule (req,res){
    try{
       
        const course = await getCourseById(req.params.course_id)

        if(!course.length > 0){
            return res.status(404).json({errors: ["Course not found"]})
        }
        const moduleObj={
            name_of_module:req.body.name_of_module,
            size:req.body.size,
            course_id: course[0].id
        };
        const module= await createModule(moduleObj)
        if(module== "created")
        {
        res.json({
            module
          });
        }
        res.status(403).json({
            module
          });
    }catch (err) {
        console.error(err);
        // res.status(500).json({ errors: ["Internal server error"] });
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
        const videos = await getVideos(req.params.id)
        if (videos) {
            videos.map((video) => {
            video.image = "http://" + req.hostname + ":3000/" + video.image;
          });
          videos.map((video) => {
            video.fileName= "http://" + req.hostname + ":3000/" + video.fileName;        
          });

        res.status(200).json(videos);

    }
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