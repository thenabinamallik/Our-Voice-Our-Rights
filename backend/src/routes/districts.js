import express from "express";
import { pool } from "../config/db.js"; // make sure this connects to your MySQL

const router = express.Router();

// GET /api/districts
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT DISTINCT district_code, district_name 
       FROM performance_data 
       ORDER BY district_name`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching districts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
