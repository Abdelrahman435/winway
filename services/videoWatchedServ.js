const util = require("util");
const {connection}= require('./../db/dbConnection');

async function add(data){
    const query = util.promisify(connection.query).bind(connection)
    const check = await query("select * from videos_watched where course_id = ? and user_id = ? and videos_id = ?", [data.course_id, data.user_id, data.videos_id]);
    if(!check.length >0){
    await query("insert into videos_watched set ? " ,[data])
    const video = await query("select * from videos_watched where course_id = ? and user_id = ?", [data.course_id, data.user_id])
    await query("update cart set num_of_videos_watched = ? where courseId = ? and studentId =?", [video.length, data.course_id, data.user_id])
    return "created"
    }else{
        return "video already watched"
    }
}
async function getVideo(id, course_id) {
    const query = util.promisify(connection.query).bind(connection);
    const videos = await query("SELECT * FROM videos WHERE id = ? and course_id =?", [id , course_id]);
    return videos;
  }

module.exports ={add, getVideo}
