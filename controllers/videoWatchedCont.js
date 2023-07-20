const util = require("util");
const fs = require("fs");
const {add} = require('../services/videoWatchedServ')
const { getUser} = require('../services/signupService');
const { getCourseById } = require("../services/coursesServices");
const { getVideoById } = require("../services/videosServices");
const {checkIfExists} = require('../services/cartService')

async function addVideoWatched(req,res){
    try {
        if(await checkIfExists(req.params.course_id, req.params.user_id)){
        const user = await getUser(req.params.user_id)
        const course = await getCourseById(req.params.course_id)
        const video = await getVideoById(req.params.videos_id)
        if(user.length > 0 && course.length > 0 && video.length > 0){
            const data = {
                course_id:req.params.course_id ,
                user_id:req.params.user_id,
                videos_id: req.params.videos_id
            }
    const x= await add(data )  
    res.status(200).json(x)
        }else{
            res.status(404).json({errors:[{msg : 'Course or Student or video not found'}]})
        }
    }
    else{
        res.status(404).json({errors:[{msg : 'Course not in cart'}]})
    }
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
    }
} 


module.exports={addVideoWatched }