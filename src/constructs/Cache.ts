import type { CacheItem } from "#schema/index.ts";

/**
 * Represents cache configuration for a job.
 * This is a thin wrapper around the generated CacheItem type.
 */
export class Cache {

  constructor(props: CacheItem) {
    Object.assign(this, props)
  }
}

export interface Cache extends CacheItem { }
