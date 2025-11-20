import { describe, it, expect } from 'vitest';
import { Cache } from '../Cache.js';

describe('Cache', () => {
  it('should create a cache with basic configuration', () => {
    const cache = new Cache({
      paths: ['node_modules/']
    });

    expect(cache.props).toEqual({
      paths: ['node_modules/']
    });
  });

  it('should create a cache with key', () => {
    const cache = new Cache({
      key: 'my-cache-key',
      paths: ['node_modules/']
    });

    expect(cache.props.key).toBe('my-cache-key');
    expect(cache.props.paths).toEqual(['node_modules/']);
  });

  it('should create a cache with key as object', () => {
    const cache = new Cache({
      key: {
        files: ['package-lock.json']
      },
      paths: ['node_modules/']
    });

    expect(cache.props.key).toEqual({
      files: ['package-lock.json']
    });
  });

  it('should create a cache with key prefix', () => {
    const cache = new Cache({
      key: {
        prefix: 'npm',
        files: ['package-lock.json']
      },
      paths: ['node_modules/']
    });

    expect(cache.props.key).toEqual({
      prefix: 'npm',
      files: ['package-lock.json']
    });
  });

  it('should create a cache with policy', () => {
    const cache = new Cache({
      paths: ['node_modules/'],
      policy: 'pull'
    });

    expect(cache.props.policy).toBe('pull');
  });

  it('should create a cache with untracked files', () => {
    const cache = new Cache({
      paths: ['build/'],
      untracked: true
    });

    expect(cache.props.untracked).toBe(true);
  });

  it('should create a cache with when condition', () => {
    const cache = new Cache({
      paths: ['node_modules/'],
      when: 'on_success'
    });

    expect(cache.props.when).toBe('on_success');
  });

  it('should create a cache with unprotect setting', () => {
    const cache = new Cache({
      paths: ['node_modules/'],
      unprotect: true
    });

    expect(cache.props.unprotect).toBe(true);
  });
});
