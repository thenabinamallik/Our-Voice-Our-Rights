import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import districtRoutes from "./routes/districts.js";
import performanceRoutes from "./routes/performance.js";
import compareRoutes from "./routes/compare.js";
import { startCronJob } from "./utils/cronJob.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/districts", districtRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/compare", compareRoutes);

app.get("/", (req, res) => res.send("MGNREGA API running 🚀"));

startCronJob(); // Start daily data sync

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
