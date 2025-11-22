import type { Artifacts } from "#schema/index.ts";

/**
 * Represents artifact configuration for a job.
 * This is a thin wrapper around the generated Artifacts type.
 */
export class Artifact {
  constructor(props: Artifacts) {
    Object.assign(this, props)
  }
}

export interface Artifact extends Artifacts { }
