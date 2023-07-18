const util = require("util");
const {connection}= require('./../db/dbConnection');


async function createReview(reviewObj){
    const query = util.promisify(connection.query).bind(connection)
    await query("insert into reviews  set ?",[reviewObj])
}
async function getReviewById(courseId){
    const query = util.promisify(connection.query).bind(connection)
    const reviews = await query("SELECT * FROM reviews WHERE courseId = ?" ,[courseId])
    return reviews
}
async function getReviewonly(id){
    const query = util.promisify(connection.query).bind(connection)
    const reviews = await query("SELECT * FROM reviews WHERE id = ?" ,[id])
    return reviews
}
async function deletReview(id){
    const query = util.promisify(connection.query).bind(connection)
    await query("delete from reviews where id = ?" ,[id])

}
module.exports = {createReview , getReviewById , deletReview , getReviewonly}