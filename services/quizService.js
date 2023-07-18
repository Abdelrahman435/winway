const util = require("util");
const { connection } = require("../db/dbConnection");

async function getQuizById(id) {
  const query = util.promisify(connection.query).bind(connection);
  const quizs = await query("SELECT * FROM questions WHERE id = ?", [id]);
  return quizs;
}

async function updateQuiz(id, quizObj) {
  const query = util.promisify(connection.query).bind(connection);
  await query("UPDATE questions SET ? WHERE id = ?", [quizObj, id]);
}

async function createQuiz(quizObj) {
  const query = util.promisify(connection.query).bind(connection);
  await query("insert into questions set ? ", [quizObj]);
}

async function deleteQuiz(id) {
  const query = util.promisify(connection.query).bind(connection);
  await query("delete from questions  where id =?", [id]);
}

async function showquizs() {
  const query = util.promisify(connection.query).bind(connection);
  return await query("select * from questions");
}



module.exports = {
  getQuizById,
  updateQuiz,
  deleteQuiz,
  createQuiz,
  showquizs,
};
