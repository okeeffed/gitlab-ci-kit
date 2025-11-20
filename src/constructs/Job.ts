import type { JobTemplate } from "../schema/index.js";

/**
 * Represents a job in a GitLab CI/CD pipeline.
 * This is a thin wrapper around the generated JobTemplate type.
 */
export class Job {
  constructor(public readonly props: JobTemplate) {}
}
