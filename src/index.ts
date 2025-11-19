/**
 * GitLab CI Kit - AWS CDK-style library for generating GitLab CI pipelines
 *
 * @packageDocumentation
 */

// Core constructs
export { Construct } from './constructs/Construct.js';
export type { ValidationError } from './constructs/Construct.js';
export { Pipeline } from './constructs/Pipeline.js';
export type { PipelineProps } from './constructs/Pipeline.js';
export { Stage } from './constructs/Stage.js';
export { Job } from './constructs/Job.js';
export type { JobProps } from './constructs/Job.js';

// Synthesizer
export { Synthesizer } from './synth/Synthesizer.js';

// Re-export types from schema (optional, for advanced users)
export type * from './schema/index.js';
