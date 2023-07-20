const {connection} = require('../db/dbConnection');
const util = require('util');


async function resetPassword(pass, id){
    try {
        const query = util.promisify(connection.query).bind(connection);
        const state = await query("UPDATE users SET password = ? where id = ?", [pass, id]);
        return state;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {resetPassword}