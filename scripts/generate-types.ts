#!/usr/bin/env tsx

import { compile } from "json-schema-to-typescript";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GITLAB_CI_SCHEMA_URL =
  "https://gitlab.com/gitlab-org/gitlab/-/raw/master/app/assets/javascripts/editor/schema/ci.json";

async function generateTypes() {
  console.log("Fetching GitLab CI JSON schema...");

  try {
    const response = await fetch(GITLAB_CI_SCHEMA_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch schema: ${response.statusText}`);
    }

    const schema = await response.json();
    console.log("Schema fetched successfully");

    console.log("Generating TypeScript types...");

    const ts = await compile(schema, "GitLabCI", {
      bannerComment: `/**
 * GitLab CI Configuration Types
 *
 * Auto-generated from GitLab's official JSON schema.
 * DO NOT EDIT MANUALLY - regenerate using: npm run generate:types
 *
 * Schema source: ${GITLAB_CI_SCHEMA_URL}
 * Generated: ${new Date().toISOString()}
 */`,
      style: {
        semi: true,
        singleQuote: true,
        trailingComma: "es5",
      },
      additionalProperties: true,
      enableConstEnums: false,
    });

    const outputDir = join(__dirname, "..", "src", "schema");
    const outputPath = join(outputDir, "gitlab-ci.types.ts");

    // Post-process to fix index signature conflicts
    const fixedTs = ts.replace(
      /(\n  \[k: string\]: Job;\n})/,
      "\n  [k: string]: Job | string | undefined | object;\n}",
    );

    mkdirSync(outputDir, { recursive: true });
    writeFileSync(outputPath, fixedTs);

    console.log(`✓ Types generated successfully: ${outputPath}`);

    // Also save the raw schema for reference
    const schemaPath = join(outputDir, "ci.json");
    writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
    console.log(`✓ Schema saved: ${schemaPath}`);
  } catch (error) {
    console.error("Error generating types:", error);
    process.exit(1);
  }
}

generateTypes();
