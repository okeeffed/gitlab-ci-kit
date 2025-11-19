import { Construct } from './Construct.js';
import { Job } from './Job.js';
import type { Pipeline } from './Pipeline.js';

/**
 * Represents a stage in a GitLab CI/CD pipeline.
 * Stages group jobs that run in parallel, and different stages run sequentially.
 */
export class Stage extends Construct {
  private readonly _jobs: Job[] = [];

  /**
   * Creates a new Stage.
   *
   * @param scope The pipeline this stage belongs to
   * @param id The stage identifier
   * @param name The stage name (used in the YAML output)
   */
  constructor(
    scope: Pipeline,
    id: string,
    public readonly name: string
  ) {
    super(scope, id);
  }

  /**
   * Adds a job to this stage.
   *
   * @param job The job to add
   * @returns This stage for method chaining
   */
  addJob(job: Job): this {
    this._jobs.push(job);
    return this;
  }

  /**
   * Returns all jobs in this stage.
   */
  get jobs(): ReadonlyArray<Job> {
    return this._jobs;
  }

  /**
   * Returns the pipeline this stage belongs to.
   */
  get pipeline(): Pipeline {
    return this.scope as Pipeline;
  }

  /**
   * Validates the stage configuration.
   *
   * @returns Array of validation error messages
   */
  protected validate(): string[] {
    const errors: string[] = [];

    // Validate that we have at least one job
    if (this._jobs.length === 0) {
      errors.push(`Stage '${this.name}' must have at least one job`);
    }

    // Validate job names are unique within the stage
    const jobNames = this._jobs.map((j) => j.jobName);
    const duplicates = jobNames.filter(
      (name, index) => jobNames.indexOf(name) !== index
    );
    if (duplicates.length > 0) {
      errors.push(
        `Stage '${this.name}' has duplicate job names: ${[...new Set(duplicates)].join(', ')}`
      );
    }

    return errors;
  }
}
