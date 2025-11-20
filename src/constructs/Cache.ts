import type { CacheItem } from "#schema/index.ts";

/**
 * Represents cache configuration for a job.
 * This is a thin wrapper around the generated CacheItem type.
 */
export class Cache {
  readonly props: CacheItem
  constructor(props: CacheItem) {
    this.props = props
  }

}
