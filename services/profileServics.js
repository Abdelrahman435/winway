const util = require("util");
const { connection } = require("../db/dbConnection");

async function updateProfile(id, profileObj) {
    const query = util.promisify(connection.query).bind(connection);
    await query("UPDATE users SET ? WHERE id = ?", [profileObj, id]);
  }

  module.exports = {updateProfile}