import { stringify } from 'yaml';
import type { Pipeline } from '../constructs/Pipeline.js';
import type { Job } from '../constructs/Job.js';

/**
 * Synthesizes a Pipeline construct tree into GitLab CI YAML.
 */
export class Synthesizer {
  /**
   * Synthesizes a pipeline to YAML string.
   *
   * @param pipeline The pipeline to synthesize
   * @returns The YAML string representation
   */
  static synthesize(pipeline: Pipeline): string {
    const config = this.buildConfiguration(pipeline);
    return stringify(config, {
      lineWidth: 0, // Don't wrap lines
      defaultStringType: 'PLAIN',
      defaultKeyType: 'PLAIN',
      nullStr: 'null',
    });
  }

  /**
   * Builds the configuration object from the pipeline.
   *
   * @param pipeline The pipeline to build from
   * @returns The configuration object
   */
  private static buildConfiguration(pipeline: Pipeline): Record<string, any> {
    const config: Record<string, any> = {};

    // Add stages
    if (pipeline.stages.length > 0) {
      config.stages = pipeline.stages.map((stage) => stage.name);
    }

    // Add global variables
    const pipelineConfig = pipeline.configuration;
    if (pipelineConfig.variables) {
      config.variables = this.normalizeVariables(pipelineConfig.variables);
    }

    // Add workflow
    if (pipelineConfig.workflow) {
      config.workflow = pipelineConfig.workflow;
    }

    // Add default
    if (pipelineConfig.default) {
      config.default = pipelineConfig.default;
    }

    // Add include
    if (pipelineConfig.include) {
      config.include = pipelineConfig.include;
    }

    // Add all jobs
    for (const stage of pipeline.stages) {
      for (const job of stage.jobs) {
        config[job.jobName] = this.buildJobConfiguration(job);
      }
    }

    return config;
  }

  /**
   * Builds the configuration object for a job.
   *
   * @param job The job to build from
   * @returns The job configuration object
   */
  private static buildJobConfiguration(job: Job): Record<string, any> {
    const jobConfig = job.toJSON();

    // Normalize variables if present
    if (jobConfig.variables) {
      jobConfig.variables = this.normalizeVariables(jobConfig.variables);
    }

    return jobConfig;
  }

  /**
   * Normalizes variables to ensure proper YAML serialization.
   * Converts boolean and number values to strings if needed by GitLab CI.
   *
   * @param variables The variables to normalize
   * @returns Normalized variables
   */
  private static normalizeVariables(
    variables: Record<string, string | number | boolean>
  ): Record<string, string> {
    const normalized: Record<string, string> = {};
    for (const [key, value] of Object.entries(variables)) {
      normalized[key] = String(value);
    }
    return normalized;
  }
}
