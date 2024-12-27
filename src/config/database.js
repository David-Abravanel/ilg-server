import mysql from "mysql2";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

async function createDatabase() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    // console.log(`Database '${process.env.DB_NAME}' created or already exists.`);
  } finally {
    connection.release();
  }
}

async function createPostsTable() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
        userId INT NOT NULL,                    
        title VARCHAR(255) NOT NULL,            
        body TEXT NOT NULL,                     
        comments TEXT
      )
    `);
    // console.log(`Posts table 'posts' created or already exists.`);
  } finally {
    connection.release();
  }
}

async function setupDatabase() {
  await createDatabase();
  await createPostsTable();
}

setupDatabase()
  .then(() => console.log(`[${chalk.green("DB")}]: setup complete`))
  .catch((err) => console.error("Error setting up database:", err));

export default pool;
