/**
 * GitLab CI Kit - AWS CDK-style library for generating GitLab CI pipelines
 *
 * @packageDocumentation
 */

// Core constructs
export { Job } from "./constructs/Job.js";
export { Rule } from "./constructs/Rule.js";
export { Cache } from "./constructs/Cache.js";
export { Artifact } from "./constructs/Artifact.js";
export { Default } from "./constructs/Default.js";

// Synthesizer
export { synth } from "./synth/synth.js";
export type { PipelineConfig } from "./synth/synth.js";

// Re-export types from schema (optional, for advanced users)
export type * from "./schema/index.js";
