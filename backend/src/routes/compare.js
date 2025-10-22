import express from "express";
import { pool } from "../config/db.js";
const router = express.Router();

// GET /api/compare/:districtId
router.get("/:districtId", async (req, res) => {
  const { districtId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT month, 
          Persondays_of_Central_Liability_so_far AS total_persondays,
          Material_and_skilled_Wages AS total_wages,
          Number_of_Completed_Works AS works_completed
   FROM performance_data
   WHERE TRIM(district_code) = ?
   ORDER BY fin_year DESC, month DESC
   LIMIT 6`,
      [districtId]
    );

    console.log(rows); // add this line

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No data found for this district" });
    }

    res.json(rows.reverse()); // chronological order
  } catch (err) {
    console.error("Error fetching comparison:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
