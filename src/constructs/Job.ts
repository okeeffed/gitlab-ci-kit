import type { IJob } from "#schema/index.ts";

/**
 * Represents a job in a GitLab CI/CD pipeline.
 * This is a thin wrapper around the generated JobTemplate type.
 */
export class Job {
  constructor(props: IJob) {
    Object.assign(this, props)
  }
}

export interface Job extends IJob { }
