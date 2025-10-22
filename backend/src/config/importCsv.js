import fs from "fs";
import csv from "csv-parser";
import { pool } from "./db.js"; // adjust path to your db.js
import dotenv from "dotenv";

dotenv.config();

const csvFilePath = "./src/config/odisha.csv"; // relative to backend folder


async function importCsv() {
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => results.push(row))
    .on("end", async () => {
      try {
        for (const row of results) {
          await pool.query(
            `INSERT INTO performance_data
            (fin_year, month, state_code, state_name, district_code, district_name,
             approved_labour_budget, average_wage_rate_per_day, average_days_per_household,
             differently_abled_persons_worked, material_and_skilled_wages,
             number_of_completed_works, number_of_gps_with_nil_exp, number_of_ongoing_works,
             persondays_of_central_liability_so_far, sc_persondays,
             sc_workers_against_active_workers, st_persondays)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              approved_labour_budget=?, average_wage_rate_per_day=?, average_days_per_household=?,
              differently_abled_persons_worked=?, material_and_skilled_wages=?,
              number_of_completed_works=?, number_of_gps_with_nil_exp=?, number_of_ongoing_works=?,
              persondays_of_central_liability_so_far=?, sc_persondays=?, sc_workers_against_active_workers=?,
              st_persondays=?`,
            [
              row.fin_year,
              row.month,
              row.state_code,
              row.state_name,
              row.district_code,
              row.district_name,
              row.Approved_Labour_Budget || 0,
              row.Average_Wage_rate_per_day_per_person || 0,
              row.Average_days_of_employment_provided_per_Household || 0,
              row.Differently_abled_persons_worked || 0,
              row.Material_and_skilled_Wages || 0,
              row.Number_of_Completed_Works || 0,
              row.Number_of_GPs_with_NIL_exp || 0,
              row.Number_of_Ongoing_Works || 0,
              row.Persondays_of_Central_Liability_so_far || 0,
              row.SC_persondays || 0,
              row.SC_workers_against_active_workers || 0,
              row.ST_persondays || 0,
              // For ON DUPLICATE KEY UPDATE
              row.Approved_Labour_Budget || 0,
              row.Average_Wage_rate_per_day_per_person || 0,
              row.Average_days_of_employment_provided_per_Household || 0,
              row.Differently_abled_persons_worked || 0,
              row.Material_and_skilled_Wages || 0,
              row.Number_of_Completed_Works || 0,
              row.Number_of_GPs_with_NIL_exp || 0,
              row.Number_of_Ongoing_Works || 0,
              row.Persondays_of_Central_Liability_so_far || 0,
              row.SC_persondays || 0,
              row.SC_workers_against_active_workers || 0,
              row.ST_persondays || 0,
            ]
          );
        }
        console.log("CSV data imported successfully!");
      } catch (err) {
        console.error("Error inserting data:", err);
      } finally {
        pool.end();
      }
    });
}

importCsv();