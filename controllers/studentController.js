const util = require("util");
const fs = require("fs");
const {showcourses , getRating, showvideos} = require('../services/studentServices')
const {getCourseById, } = require('../services/coursesServices')

async function showCourses(req, res) {
    try {
      let courses = [];
      let course = []
      let cart = await showcourses(req.params.user_id);
      if (cart) {
        for(let i = 0; i < cart.length; i++) {
          let course = await getCourseById(cart[i].courseId);
          let rating = await getRating(cart[i].courseId);
          let videos = await showvideos(cart[i].courseId)
          let courseData = {
            id: course[0].id,
            name: course[0].name,
            price: course[0].price,
            description: course[0].description,
            image: `http://${req.hostname}:3000/${course[0].image}`,
            num_of_videos_watched: cart[i].num_of_videos_watched,
            rating: rating,
            videos: videos.length
          };
          courses.push(courseData);
        }
        res.status(200).json(courses);
      } else {
        res.status(404).json({ errors: ["No Courses found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

module.exports={ showCourses}