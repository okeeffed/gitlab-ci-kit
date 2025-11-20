import type { CamelCasedPropertiesDeep } from 'type-fest';
import type { Artifacts } from '../schema/index.js';

/**
 * Artifact configuration with camelCase property names.
 */
export type ArtifactProps = CamelCasedPropertiesDeep<Artifacts>;

/**
 * Represents artifact configuration for a job.
 * This is a thin wrapper around the generated Artifacts type.
 */
export class Artifact {
  constructor(public readonly props: ArtifactProps) { }
}
