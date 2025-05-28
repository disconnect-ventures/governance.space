import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not defined in environment.");
  process.exit(1);
}

try {
  console.log("🟦 Pushing schema to the database...");
  execSync("npx prisma db push", {
    //--force-reset
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL,
    },
  });

  console.log("✅ Database schema pushed successfully.");

  console.log("🟦 Generating Prisma client...");
  execSync("npx prisma generate", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL,
    },
  });

  console.log("✅ Prisma client generated.");
} catch (err) {
  console.error("❌ Failed to initialize database:", err);
  process.exit(1);
}
