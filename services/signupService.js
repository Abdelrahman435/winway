const {connection} = require('../db/dbConnection');
const util = require('util');

async function getEmail(email){
    try {
        const query = util.promisify(connection.query).bind(connection);
        const getEmail = await query("select * from users where email = ?", [email]);
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


async function insertOTP(data){
    try {
        query = util.promisify(connection.query).bind(connection);
        await query('INSERT INTO OTP SET ?', [data]);
    } catch (error) {
        console.log(error);
    }
}

async function getId(email){
    try {
        const query = util.promisify(connection.query).bind(connection);
        const id = await query("select id from users where email = ?", [email]);
        return id;
    } catch (error) {
        console.log(error);
    }
}

async function getUser(id){
    try {
        const query = util.promisify(connection.query).bind(connection);
        const idd = await query("select * from users where id = ?", [id]);
        console.log(idd.length);
        return idd.length > 0;
    } catch (error) {
        console.log(error);
    }
}




module.exports = {getEmail, insertUser, insertOTP, getId, getUser};