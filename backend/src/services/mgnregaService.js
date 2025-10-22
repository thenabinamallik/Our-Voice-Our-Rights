import { pool } from "../config/db.js";

export async function updateDatabase() {
  const dummyDistricts = [
    { id: 1, name: "District A", state: "Uttar Pradesh" },
    { id: 2, name: "District B", state: "Uttar Pradesh" },
  ];

  // Insert districts
  for (let d of dummyDistricts) {
    await pool.query(
      `INSERT INTO districts (id, name, state) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE name = VALUES(name), state = VALUES(state)`,
      [d.id, d.name, d.state]
    );
  }

  // Insert dummy performance data
  const dummyData = [
    { district_id: 1, month: "2025-10-01", total_households: 24000, total_persondays: 120000, total_wages: 3000000 },
    { district_id: 1, month: "2025-09-01", total_households: 22000, total_persondays: 110000, total_wages: 2700000 },
  ];

  for (let p of dummyData) {
    await pool.query(
      `INSERT INTO performance_data (district_id, month, total_households, total_persondays, total_wages)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE total_households=VALUES(total_households), total_persondays=VALUES(total_persondays), total_wages=VALUES(total_wages)`,
      [p.district_id, p.month, p.total_households, p.total_persondays, p.total_wages]
    );
  }

  console.log("✅ Database updated with dummy data");
}
