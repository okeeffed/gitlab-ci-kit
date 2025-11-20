import type { CamelCasedPropertiesDeep } from 'type-fest';
import type { JobTemplate } from '../schema/index.ts';
import type { Rule } from './Rule.ts';

/**
 * Job configuration with camelCase property names.
 */
export type JobProps = CamelCasedPropertiesDeep<JobTemplate> & {
  rules?: JobTemplate['rules'] | Rule[]
};

/**
 * Represents a job in a GitLab CI/CD pipeline.
 * This is a thin wrapper around the generated JobTemplate type.
 */
export class Job {
  constructor(public readonly props: JobProps) { }
}
