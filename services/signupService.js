const {connection} = require('../db/dbConnection');
const util = require('util');

async function getEmail(email){
    try {
        const query = util.promisify(connection.query).bind(connection);
        const getEmail = await query("select * from users where email = ?", [email]);
        // console.log(getEmail.length > 0);
        return getEmail.length > 0;
    } catch (error) {
        console.log(error);
    }
}


async function insertUser(data){
    try {
        query = util.promisify(connection.query).bind(connection);
        const user = await query('INSERT INTO users SET ?', [data]);
        if(!user) return {msg: 'INTERNAL SERVER ERROR', status: 500};
    } catch (error) {
        console.log(error);
    }
}



module.exports = {getEmail, insertUser};