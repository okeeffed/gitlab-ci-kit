import type { HttpsGitlabComGitlabCiYml } from '../schema/index.js';
import type { CamelCasedPropertiesDeep } from 'type-fest';

/**
 * Extract the default configuration type from the schema.
 */
type DefaultConfig = NonNullable<HttpsGitlabComGitlabCiYml['default']>;

/**
 * Default configuration with camelCase property names.
 */
export type DefaultProps = CamelCasedPropertiesDeep<DefaultConfig>;

/**
 * Represents default configuration inherited by all jobs.
 * This is a thin wrapper around the generated default type.
 */
export class Default {
  constructor(public readonly props: DefaultProps) { }
}
