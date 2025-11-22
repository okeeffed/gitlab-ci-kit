import type { HttpsGitlabComGitlabCiYml } from "#schema/index.ts";

/**
 * Represents default configuration inherited by all jobs.
 * This is a thin wrapper around the generated default type.
 */
export class Default {
  constructor(props: NonNullable<HttpsGitlabComGitlabCiYml["default"]>) {
    Object.assign(this, props)
  }
}

export interface Default extends NonNullable<HttpsGitlabComGitlabCiYml["default"]> { }
