import type { CacheItem } from '../schema/index.js';

/**
 * Represents cache configuration for a job.
 * This is a thin wrapper around the generated CacheItem type.
 */
export class Cache {
  constructor(public readonly props: CacheItem) { }
}
