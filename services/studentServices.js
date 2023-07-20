const util = require("util");
const { connection } = require("../db/dbConnection");

// async function showcourses(studyId) {
//     const query = util.promisify(connection.query).bind(connection);
//     const cartItems = await query("SELECT courseId, num_of_videos_watched FROM cart WHERE studentId = ?", [studyId]);
  
//     let courses = [];
//     for (let i = 0; i < cartItems.length; i++) {
//       const course = await query("SELECT * FROM courses WHERE id = ?", [cartItems[i].courseId]);
//       course.num_of_videos_watched = cartItems[i].num_of_videos_watched;
//       course[0].image =
//       "http://" + req.hostname + ":3000/" + course[0].image;
//       courses.push(course);
//     }
  
//     return courses;
//   }
async function showvideos(id) {
    const query = util.promisify(connection.query).bind(connection);
    return await query("select * from videos where course_id = ?", [id]);
  }

async function getRating(courseId) {
    const query = util.promisify(connection.query).bind(connection);
    const reviews = await query("SELECT rating FROM reviews WHERE courseId = ?", [courseId]);
    if (reviews.length === 0) {
      return 0; // No reviews found, return 0 rating
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / reviews.length;
    return average;
  }

async function showcourses(studyId){
    const query = util.promisify(connection.query).bind(connection);
    return await query("SELECT courseId, num_of_videos_watched FROM cart WHERE studentId = ?", [studyId]);
}
module.exports = {showcourses, getRating, showvideos}