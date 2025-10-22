import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config(); // make sure this is here

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,        // must not be empty
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
