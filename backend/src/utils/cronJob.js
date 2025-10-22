import cron from "node-cron";
import { updateDatabase } from "../services/mgnregaService.js";

export const startCronJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("🔄 Syncing MGNREGA data...");
    await updateDatabase();
    console.log("✅ Sync complete");
  });
};
