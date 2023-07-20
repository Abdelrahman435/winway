const util = require("util");
const {connection}= require('./../db/dbConnection');

async function checkIfExists(courseId, studentId){
    const query = util.promisify(connection.query).bind(connection)
    const cart = await query("SELECT * FROM cart WHERE courseId = ? and studentId = ?" , [courseId , studentId])
    return cart.length > 0
}

async function createCart(courseId, studentId){
    const query = util.promisify(connection.query).bind(connection)
    const cart = await query("SELECT * FROM cart WHERE courseId = ? and studentId = ?" , [courseId , studentId])
    let data = 
    {courseId:courseId , studentId:studentId}
    if(!cart.length >0 ){
    await query("insert into cart set ? " ,[data])
    return "created"
    } 
    return "Course already exist"
}
async function removeCart(courseId , studentId){
    const query = util.promisify(connection.query).bind(connection)
    const cart = await query("DELETE FROM cart WHERE courseId = ? and studentId = ?" , [courseId , studentId])
}

module.exports ={createCart ,removeCart, checkIfExists}

