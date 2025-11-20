import type { HttpsGitlabComGitlabCiYml } from '../schema/index.js';

/**
 * Represents default configuration inherited by all jobs.
 * This is a thin wrapper around the generated default type.
 */
export class Default {
  constructor(public readonly props: NonNullable<HttpsGitlabComGitlabCiYml['default']>) { }
}
