import type { Artifacts } from '../schema/index.js';

/**
 * Represents artifact configuration for a job.
 * This is a thin wrapper around the generated Artifacts type.
 */
export class Artifact {
  constructor(public readonly props: Artifacts) { }
}
