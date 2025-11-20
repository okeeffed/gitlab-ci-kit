import type { CacheItem } from '../schema/index.js';
import type { CamelCasedPropertiesDeep } from 'type-fest';

/**
 * Cache configuration with camelCase property names.
 */
export type CacheProps = CamelCasedPropertiesDeep<CacheItem>;

/**
 * Represents cache configuration for a job.
 * This is a thin wrapper around the generated CacheItem type.
 */
export class Cache {
  constructor(public readonly props: CacheProps) { }
}
