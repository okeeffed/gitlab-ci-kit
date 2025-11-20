import type { Artifacts } from "#schema/index.ts";

/**
 * Represents artifact configuration for a job.
 * This is a thin wrapper around the generated Artifacts type.
 */
export class Artifact {
  readonly props: Artifacts
  constructor(props: Artifacts) {
    this.props = props
  }
}
