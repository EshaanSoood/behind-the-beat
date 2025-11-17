import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import readline from "readline";

// Read .env.local file
function readEnvFile() {
  const envPath = join(process.cwd(), ".env.local");
  
  if (!existsSync(envPath)) {
    console.error("❌ .env.local file not found!");
    console.log("\nPlease create .env.local with the following variables:");
    console.log("  SANITY_PROJECT_ID=74f8ikg7");
    console.log("  SANITY_DATASET=production");
    console.log("  SANITY_API_VERSION=2024-10-01");
    console.log("  NEXT_PUBLIC_SITE_URL=https://behindthebeat.vercel.app");
    console.log("  SANITY_API_TOKEN=your-token-here (optional, for migrations)");
    process.exit(1);
  }

  const envContent = readFileSync(envPath, "utf8");
  const envVars = {};

  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    // Skip comments and empty lines
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        // Join back in case value contains = sign
        const value = valueParts.join("=").trim();
        // Remove quotes if present
        envVars[key.trim()] = value.replace(/^["']|["']$/g, "");
      }
    }
  });

  return envVars;
}

// Set environment variable in Vercel using interactive input
function setVercelEnv(key, value, environment) {
  try {
    console.log(`\nSetting ${key} for ${environment}...`);
    // Use vercel env add with the value piped in
    execSync(`echo "${value}" | vercel env add ${key} ${environment}`, {
      stdio: "inherit",
    });
    console.log(`✓ Successfully set ${key} for ${environment}`);
    return true;
  } catch (error) {
    // If variable already exists, try to update it
    if (error.message.includes("already exists") || error.message.includes("duplicate")) {
      console.log(`⚠️  ${key} already exists for ${environment}.`);
      console.log(`   To update, manually run: vercel env rm ${key} ${environment} && echo "${value}" | vercel env add ${key} ${environment}`);
      return false;
    }
    console.error(`✗ Failed to set ${key} for ${environment}:`, error.message);
    return false;
  }
}

// Main function
async function syncEnvToVercel() {
  console.log("🔍 Reading .env.local file...\n");
  
  const envVars = readEnvFile();
  
  console.log(`Found ${Object.keys(envVars).length} environment variables:\n`);
  Object.keys(envVars).forEach((key) => {
    // Mask sensitive values
    const value = envVars[key];
    const masked = key.includes("TOKEN") || key.includes("SECRET") || key.includes("KEY")
      ? "*".repeat(Math.min(value.length, 20))
      : value;
    console.log(`  ${key}=${masked}`);
  });

  // Check if linked to Vercel
  console.log("\n🔗 Checking Vercel project link...");
  try {
    execSync("vercel env ls", { stdio: "pipe" });
    console.log("✓ Linked to Vercel project\n");
  } catch (error) {
    console.error("❌ Not linked to a Vercel project!");
    console.log("\nPlease run: vercel link");
    process.exit(1);
  }

  // Required variables for Next.js app (not SANITY_API_TOKEN which is only for migrations)
  const requiredVars = [
    "SANITY_PROJECT_ID",
    "SANITY_DATASET", 
    "SANITY_API_VERSION",
    "NEXT_PUBLIC_SITE_URL"
  ];

  // Optional variables
  const optionalVars = ["SANITY_API_TOKEN"];

  console.log("\n📤 Syncing environment variables to Vercel...\n");
  console.log("This will set variables for: production, preview, and development environments\n");

  const environments = ["production", "preview", "development"];
  let successCount = 0;
  let skipCount = 0;

  // Set required variables
  for (const key of requiredVars) {
    if (!envVars[key]) {
      console.warn(`⚠️  Warning: ${key} not found in .env.local`);
      continue;
    }

    for (const env of environments) {
      try {
        // Try to add the variable
        const result = setVercelEnv(key, envVars[key], env);
        if (result) {
          successCount++;
        } else {
          skipCount++;
        }
      } catch (error) {
        console.error(`Error setting ${key} for ${env}:`, error.message);
      }
    }
  }

  // Set optional variables (like SANITY_API_TOKEN for migrations)
  for (const key of optionalVars) {
    if (envVars[key]) {
      console.log(`\n📝 Setting optional variable: ${key}`);
      for (const env of environments) {
        try {
          const result = setVercelEnv(key, envVars[key], env);
          if (result) {
            successCount++;
          } else {
            skipCount++;
          }
        } catch (error) {
          console.error(`Error setting ${key} for ${env}:`, error.message);
        }
      }
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✓ Sync complete!`);
  console.log(`  Successfully set: ${successCount} variables`);
  if (skipCount > 0) {
    console.log(`  Skipped (already exist): ${skipCount} variables`);
  }
  console.log("\n⚠️  Note: You may need to redeploy for changes to take effect.");
  console.log("   Run: vercel --prod");
}

syncEnvToVercel().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
