import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  console.log("DB_USER=", process.env.DB_USER); // check if loaded
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [rows] = await pool.query("SELECT 1+1 AS result");
    console.log("DB connected!", rows);
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
}

test();
