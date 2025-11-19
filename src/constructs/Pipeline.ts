import { Construct } from './Construct.js';
import { Stage } from './Stage.js';
import { Synthesizer } from '../synth/Synthesizer.js';

/**
 * Configuration options for a Pipeline.
 */
export interface PipelineProps {
  /**
   * Global variables available to all jobs.
   */
  variables?: Record<string, string | number | boolean>;

  /**
   * Default settings inherited by all jobs.
   */
  default?: {
    image?: string;
    before_script?: string[];
    after_script?: string[];
    cache?: any;
    retry?: number | { max: number };
    timeout?: string;
    interruptible?: boolean;
    tags?: string[];
  };

  /**
   * Workflow rules that determine when pipelines are created.
   */
  workflow?: {
    rules?: Array<{
      if?: string;
      when?: 'always' | 'never';
      variables?: Record<string, string>;
    }>;
    name?: string;
    auto_cancel?: {
      on_new_commit?: 'conservative' | 'interruptible' | 'none';
      on_job_failure?: 'none' | 'all';
    };
  };

  /**
   * External YAML files to include.
   */
  include?: Array<
    | string
    | {
        local?: string;
        project?: string;
        ref?: string;
        file?: string | string[];
        template?: string;
        remote?: string;
      }
  >;
}

/**
 * Represents a GitLab CI/CD Pipeline.
 * This is the root construct in the construct tree.
 */
export class Pipeline extends Construct {
  private readonly _stages: Stage[] = [];
  private readonly props: PipelineProps;

  /**
   * Creates a new Pipeline.
   *
   * @param scope The scope (should be null for Pipeline as it's the root)
   * @param id The pipeline identifier
   * @param props Pipeline configuration properties
   */
  constructor(
    scope: Construct | null,
    id: string,
    props: PipelineProps = {}
  ) {
    super(scope, id);
    this.props = props;
  }

  /**
   * Adds a stage to the pipeline.
   *
   * @param stage The stage to add
   * @returns This pipeline for method chaining
   */
  addStage(stage: Stage): this {
    this._stages.push(stage);
    return this;
  }

  /**
   * Creates and adds a new stage to the pipeline.
   *
   * @param id The stage identifier
   * @param name The stage name
   * @returns The created stage
   */
  stage(id: string, name: string): Stage {
    const stage = new Stage(this, id, name);
    this.addStage(stage);
    return stage;
  }

  /**
   * Returns all stages in this pipeline.
   */
  get stages(): ReadonlyArray<Stage> {
    return this._stages;
  }

  /**
   * Returns the pipeline configuration properties.
   */
  get configuration(): Readonly<PipelineProps> {
    return this.props;
  }

  /**
   * Sets or updates global variables.
   *
   * @param variables Variables to set or merge
   * @returns This pipeline for method chaining
   */
  setVariables(variables: Record<string, string | number | boolean>): this {
    this.props.variables = {
      ...this.props.variables,
      ...variables,
    };
    return this;
  }

  /**
   * Sets workflow configuration.
   *
   * @param workflow Workflow configuration
   * @returns This pipeline for method chaining
   */
  setWorkflow(workflow: PipelineProps['workflow']): this {
    this.props.workflow = workflow;
    return this;
  }

  /**
   * Adds include configurations.
   *
   * @param include Include configuration(s) to add
   * @returns This pipeline for method chaining
   */
  addInclude(
    ...include: NonNullable<PipelineProps['include']>
  ): this {
    this.props.include = [...(this.props.include || []), ...include];
    return this;
  }

  /**
   * Sets default configuration for all jobs.
   *
   * @param defaults Default configuration
   * @returns This pipeline for method chaining
   */
  setDefault(defaults: PipelineProps['default']): this {
    this.props.default = {
      ...this.props.default,
      ...defaults,
    };
    return this;
  }

  /**
   * Validates the pipeline configuration.
   *
   * @returns Array of validation error messages
   */
  protected validate(): string[] {
    const errors: string[] = [];

    // Validate that we have at least one stage
    if (this._stages.length === 0) {
      errors.push('Pipeline must have at least one stage');
    }

    // Validate stage names are unique
    const stageNames = this._stages.map((s) => s.name);
    const duplicates = stageNames.filter(
      (name, index) => stageNames.indexOf(name) !== index
    );
    if (duplicates.length > 0) {
      errors.push(
        `Duplicate stage names found: ${[...new Set(duplicates)].join(', ')}`
      );
    }

    return errors;
  }

  /**
   * Synthesizes the pipeline to a GitLab CI YAML string.
   *
   * @returns The YAML representation of the pipeline
   * @throws Error if validation fails
   */
  synth(): string {
    // Validate the entire construct tree
    const errors = this.validateTree();
    if (errors.length > 0) {
      const errorMessages = errors
        .map((e) => `  [${e.path}] ${e.message}`)
        .join('\n');
      throw new Error(`Pipeline validation failed:\n${errorMessages}`);
    }

    // Use the synthesizer to generate YAML
    return Synthesizer.synthesize(this);
  }
}
