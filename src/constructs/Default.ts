import type { HttpsGitlabComGitlabCiYml } from "#schema/index.ts";

/**
 * Represents default configuration inherited by all jobs.
 * This is a thin wrapper around the generated default type.
 */
export class Default {
  readonly props: NonNullable<HttpsGitlabComGitlabCiYml["default"]>

  constructor(props: NonNullable<HttpsGitlabComGitlabCiYml["default"]>) {
      this.props = props 
  }
}
