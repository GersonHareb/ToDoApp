const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "7703",
  port: 5432,
});

//new chore
async function newChore(chore) {
  const values = [chore];
  const query = {
    text: `INSERT INTO chore (chore, completed) VALUES ($1, false)`,
    values: values,
  };
  try {
    await pool.query(query);
  } catch (error) {
    console.log(error.message);
  }
}

async function getChores() {
  try {
    const result = await pool.query(`SELECT * FROM chore`);
    return result.rows;
  } catch (error) {
    console.log(error.message);
  }
}

async function eraseChore(id) {
  const values = [id];
  const query = {
    text: `DELETE FROM chore WHERE id = $1`,
    values: values,
  };
  try {
    await pool.query(query);
  } catch (error) {
    console.log(error.message);
  }
}

async function editChore(id, chore) {
  const values = [chore, id];
  const query = {
    text: `UPDATE chore SET chore = $1 WHERE id = $2`,
    values: values,
  };
  try {
    await pool.query(query);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { newChore, getChores, editChore, eraseChore };
