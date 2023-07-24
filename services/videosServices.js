const util = require("util");
const {connection} = require('../db/dbConnection');


  async function getVideoById(id) {
    const query = util.promisify(connection.query).bind(connection);
    const videos = await query("SELECT * FROM videos WHERE id = ?", [id]);
    return videos;
  }

  async function updateVideo(id, videoObj) {
    const query = util.promisify(connection.query).bind(connection);
    await query("UPDATE videos SET ? WHERE id = ?", [videoObj, id]);
  }

  async function createVideo(videoObj, module_id) {
    const query = util.promisify(connection.query).bind(connection);
    const check = await query("select * from videos where id = ? and module_id = ?", [videoObj.id, module_id]);
    if(!check.length > 0) {
    await query("insert into videos set ? ", [videoObj]);
    return "Video created successfully"
  }else{
    "video already exists"
  }
  }



  async function checkCourse(id){
    const query = util.promisify(connection.query).bind(connection);
    const course = await query("SELECT * FROM courses WHERE id = ?", [id]);
    return course.length > 0;
  }

  async function deleteVideo(id) {
    const query = util.promisify(connection.query).bind(connection);
    await query("delete from videos  where id =?", [id]);
  }

  async function showvideos() {
    const query = util.promisify(connection.query).bind(connection);
    return await query("select * from videos");
  }

  async function getModule(id, course_id){
    const query = util.promisify(connection.query).bind(connection)
    const module = await query("SELECT * FROM modulecourses WHERE id = ? and course_id =?" ,[id, course_id])
    return module
}



module.exports = {getVideoById, updateVideo, deleteVideo, createVideo, showvideos, checkCourse, getModule}