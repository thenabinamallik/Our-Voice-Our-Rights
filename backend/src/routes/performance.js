import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// GET /api/performance/:districtId
router.get("/:districtId", async (req, res) => {
  const { districtId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT month, 
              Persondays_of_Central_Liability_so_far,
              Material_and_skilled_Wages,
              Number_of_Completed_Works
       FROM performance_data
       WHERE district_code = ? 
       ORDER BY fin_year, month`,
      [districtId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No data found for this district" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Error fetching performance:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
