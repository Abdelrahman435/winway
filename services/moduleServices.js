const util = require("util");
const {connection}= require('./../db/dbConnection');


async function createModule(moduleObj){
    const query = util.promisify(connection.query).bind(connection)
    await query("insert into modulecourses set ?",[moduleObj])
}
async function getModuleById(id){
    const query = util.promisify(connection.query).bind(connection)
    const module = await query("SELECT * FROM modulecourses WHERE id = ?" ,[id])
    return module
}
async function getmoduls(id){
    const query = util.promisify(connection.query).bind(connection)
    const modules = await query("SELECT * FROM modulecourses WHERE course_id = ?" ,[id])
    return modules
}
async function deletModule(id){
    const query = util.promisify(connection.query).bind(connection)
    await query("delete from modulecourses where id = ?" ,[id])

}
module.exports = {createModule , getmoduls , deletModule , getModuleById}