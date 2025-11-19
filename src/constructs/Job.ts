import { Construct } from './Construct.js';
import type { Stage } from './Stage.js';
import type {
  Image,
  Services,
  Artifacts,
  Cache,
  Tags,
} from '../schema/index.js';

/**
 * Configuration options for a Job.
 */
export interface JobProps {
  /**
   * The script(s) to execute. This is the only required field.
   */
  script: string | string[];

  /**
   * Docker image to use for the job.
   */
  image?: string | Image;

  /**
   * Services (like databases) to link with the job.
   */
  services?: Services;

  /**
   * Scripts to run before the main script.
   */
  before_script?: string | string[];

  /**
   * Scripts to run after the main script.
   */
  after_script?: string | string[];

  /**
   * Variables specific to this job.
   */
  variables?: Record<string, string | number | boolean>;

  /**
   * Artifacts to save after the job completes.
   */
  artifacts?: Artifacts;

  /**
   * Cache configuration for this job.
   */
  cache?: Cache;

  /**
   * Tags to select specific runners.
   */
  tags?: string[] | Tags;

  /**
   * When to run this job.
   */
  when?: 'on_success' | 'on_failure' | 'always' | 'manual' | 'delayed' | 'never';

  /**
   * Whether the job can be interrupted.
   */
  interruptible?: boolean;

  /**
   * Whether failure of this job should allow the pipeline to continue.
   */
  allow_failure?: boolean | { exit_codes: number | number[] };

  /**
   * Maximum time the job can run.
   */
  timeout?: string;

  /**
   * Retry configuration.
   */
  retry?: number | { max: number; when?: string | string[] };

  /**
   * Jobs this job depends on (for DAG pipelines).
   */
  needs?: Array<
    | string
    | {
        job: string;
        artifacts?: boolean;
        optional?: boolean;
      }
  >;

  /**
   * Rules for conditional job execution.
   */
  rules?: Array<{
    if?: string;
    when?: 'on_success' | 'on_failure' | 'always' | 'manual' | 'delayed' | 'never';
    changes?: string[];
    exists?: string[];
    allow_failure?: boolean;
    variables?: Record<string, string>;
  }>;

  /**
   * Environment for deployment jobs.
   */
  environment?:
    | string
    | {
        name: string;
        url?: string;
        on_stop?: string;
        action?: 'start' | 'prepare' | 'stop';
        auto_stop_in?: string;
        deployment_tier?: string;
      };

  /**
   * Code coverage regex pattern.
   */
  coverage?: string;

  /**
   * Parallel execution configuration.
   */
  parallel?: number | { matrix: Array<Record<string, string | string[]>> };

  /**
   * Resource group for limiting concurrency.
   */
  resource_group?: string;

  /**
   * Release configuration.
   */
  release?: {
    tag_name: string;
    tag_message?: string;
    name?: string;
    description?: string;
    ref?: string;
    milestones?: string[];
    released_at?: string;
    assets?: {
      links?: Array<{
        name: string;
        url: string;
        filepath?: string;
        link_type?: string;
      }>;
    };
  };

  /**
   * ID tokens for OIDC authentication.
   */
  id_tokens?: Record<
    string,
    {
      aud: string | string[];
    }
  >;

  /**
   * Secrets configuration.
   */
  secrets?: Record<
    string,
    {
      vault?: {
        engine: { name: string; path: string };
        path: string;
        field: string;
      };
      token?: string;
    }
  >;

  /**
   * Jobs to inherit from (extends).
   */
  extends?: string | string[];

  /**
   * Jobs this job depends on for artifacts.
   */
  dependencies?: string[];
}

/**
 * Represents a job in a GitLab CI/CD pipeline.
 */
export class Job extends Construct {
  private readonly props: JobProps;

  /**
   * Creates a new Job.
   *
   * @param scope The stage this job belongs to
   * @param id The job identifier (used as the job name in YAML)
   * @param props Job configuration properties
   */
  constructor(scope: Stage, id: string, props: JobProps) {
    super(scope, id);
    this.props = props;
  }

  /**
   * Returns the job name (same as the ID).
   */
  get jobName(): string {
    return this.id;
  }

  /**
   * Returns the stage this job belongs to.
   */
  get stage(): Stage {
    return this.scope as Stage;
  }

  /**
   * Returns the job configuration properties.
   */
  get configuration(): Readonly<JobProps> {
    return this.props;
  }

  /**
   * Sets or updates job variables.
   *
   * @param variables Variables to set or merge
   * @returns This job for method chaining
   */
  setVariables(variables: Record<string, string | number | boolean>): this {
    this.props.variables = {
      ...this.props.variables,
      ...variables,
    };
    return this;
  }

  /**
   * Adds a script command.
   *
   * @param script Script command(s) to add
   * @returns This job for method chaining
   */
  addScript(...script: string[]): this {
    const current = Array.isArray(this.props.script)
      ? this.props.script
      : [this.props.script];
    this.props.script = [...current, ...script];
    return this;
  }

  /**
   * Adds before_script commands.
   *
   * @param script Script command(s) to add
   * @returns This job for method chaining
   */
  addBeforeScript(...script: string[]): this {
    const current = this.props.before_script
      ? Array.isArray(this.props.before_script)
        ? this.props.before_script
        : [this.props.before_script]
      : [];
    this.props.before_script = [...current, ...script];
    return this;
  }

  /**
   * Adds after_script commands.
   *
   * @param script Script command(s) to add
   * @returns This job for method chaining
   */
  addAfterScript(...script: string[]): this {
    const current = this.props.after_script
      ? Array.isArray(this.props.after_script)
        ? this.props.after_script
        : [this.props.after_script]
      : [];
    this.props.after_script = [...current, ...script];
    return this;
  }

  /**
   * Sets the job's needs (dependencies).
   *
   * @param needs Jobs this job needs
   * @returns This job for method chaining
   */
  setNeeds(...needs: NonNullable<JobProps['needs']>): this {
    this.props.needs = needs;
    return this;
  }

  /**
   * Adds rules for conditional execution.
   *
   * @param rules Rules to add
   * @returns This job for method chaining
   */
  addRules(...rules: NonNullable<JobProps['rules']>): this {
    this.props.rules = [...(this.props.rules || []), ...rules];
    return this;
  }

  /**
   * Sets tags for runner selection.
   *
   * @param tags Tags to set
   * @returns This job for method chaining
   */
  setTags(...tags: string[]): this {
    this.props.tags = tags;
    return this;
  }

  /**
   * Sets the environment for this job.
   *
   * @param environment Environment configuration
   * @returns This job for method chaining
   */
  setEnvironment(environment: JobProps['environment']): this {
    this.props.environment = environment;
    return this;
  }

  /**
   * Validates the job configuration.
   *
   * @returns Array of validation error messages
   */
  protected validate(): string[] {
    const errors: string[] = [];

    // Validate required fields
    if (!this.props.script || this.props.script.length === 0) {
      errors.push(`Job '${this.jobName}' must have at least one script command`);
    }

    // Validate job name doesn't start with a dot (reserved for templates)
    if (this.jobName.startsWith('.')) {
      errors.push(
        `Job name '${this.jobName}' cannot start with a dot (reserved for templates)`
      );
    }

    // Validate timeout format if present
    if (this.props.timeout) {
      const timeoutRegex = /^\d+\s*(seconds?|minutes?|hours?|days?|weeks?|months?|years?)$/i;
      if (!timeoutRegex.test(this.props.timeout)) {
        errors.push(
          `Job '${this.jobName}' has invalid timeout format: ${this.props.timeout}`
        );
      }
    }

    return errors;
  }

  /**
   * Converts the job configuration to a plain object for YAML serialization.
   *
   * @returns Job configuration as a plain object
   */
  toJSON(): Record<string, any> {
    const config: Record<string, any> = {
      stage: this.stage.name,
      ...this.props,
    };

    // Normalize script to array
    if (typeof config.script === 'string') {
      config.script = [config.script];
    }

    // Normalize before_script to array
    if (config.before_script && typeof config.before_script === 'string') {
      config.before_script = [config.before_script];
    }

    // Normalize after_script to array
    if (config.after_script && typeof config.after_script === 'string') {
      config.after_script = [config.after_script];
    }

    return config;
  }
}
