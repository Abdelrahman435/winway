const util = require("util")
const fs = require("fs")
const{createReview , getReviewById ,deletReview , getReviewonly}=require("../services/studentReview")
const { getCourseById } = require("../services/coursesServices")


async function addReview (req,res){
    try{
       
        const course = await getCourseById(req.params.courseId)
        if(!course.length > 0){
            return res.status(404).json({errors: ["Course not found"]})
        }
        const reviewObj={
            body:req.body.body,
            rating:req.body.rating,
            studentId: req.params.studentId,
            courseId :req.params.courseId
        };
        await createReview(reviewObj)
        res.status(200).json({
            msg: "Review created",
          });
    }catch (err) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
      }
}

async function getReview (req,res){
    try {
        const reviews = await getReviewById(req.params.courseId)
        if(!reviews[0]){
            return res.status(404).json({ errors: ["reviews not found"] });
        }
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
    }
}
async function getReviewOne (req,res){
    try {
        const review = await getReviewonly(req.params.id)
        if(!review.length > 0){
            return res.status(404).json({ errors: ["review not found"] });
        }
        res.status(200).json(review);

    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
    }
}
async function delet(req,res){
    try {
      
        const review = await getReviewonly(req.params.id)
        if(!review.length > 0){
            res.status(404).json({ errors: ["review not found"] });
        }
        await deletReview(review[0].id)
        res.status(200).json({ msg: "review Deleted successfully",});

    } catch (err) {
        // console.error(err);
        // res.status(500).json({ errors: ["Internal server error"] });
    }
}
module.exports={addReview , getReview , getReviewOne , delet}