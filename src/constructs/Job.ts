import type { JobTemplate } from "#schema/index.ts";

/**
 * Represents a job in a GitLab CI/CD pipeline.
 * This is a thin wrapper around the generated JobTemplate type.
 */
export class Job {
  readonly props: JobTemplate
  constructor(props: JobTemplate) {
    this.props = props
  }
}
