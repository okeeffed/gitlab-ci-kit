import { describe, it, expect } from 'vitest';
import { Artifact } from '../Artifact.js';

describe('Artifact', () => {
  it('should create an artifact with basic configuration', () => {
    const artifact = new Artifact({
      paths: ['dist/', 'build/']
    });

    expect(artifact).toEqual({
      paths: ['dist/', 'build/']
    });
  });

  it('should create an artifact with name and paths', () => {
    const artifact = new Artifact({
      name: 'my-artifacts',
      paths: ['coverage/']
    });

    expect(artifact.name).toBe('my-artifacts');
    expect(artifact.paths).toEqual(['coverage/']);
  });

  it('should create an artifact with expire_in', () => {
    const artifact = new Artifact({
      paths: ['dist/'],
      expire_in: '1 week'
    });

    expect(artifact.expire_in).toBe('1 week');
  });

  it('should create an artifact with exclude patterns', () => {
    const artifact = new Artifact({
      paths: ['dist/'],
      exclude: ['*.log', 'tmp/']
    });

    expect(artifact.exclude).toEqual(['*.log', 'tmp/']);
  });

  it('should create an artifact with expose_as', () => {
    const artifact = new Artifact({
      paths: ['dist/'],
      expose_as: 'Build artifacts'
    });

    expect(artifact.expose_as).toBe('Build artifacts');
  });

  it('should create an artifact with when condition', () => {
    const artifact = new Artifact({
      paths: ['logs/'],
      when: 'on_failure'
    });

    expect(artifact.when).toBe('on_failure');
  });

  it('should create an artifact with untracked files', () => {
    const artifact = new Artifact({
      paths: ['dist/'],
      untracked: true
    });

    expect(artifact.untracked).toBe(true);
  });

  it('should assign properties directly to instance', () => {
    const artifact = new Artifact({
      paths: ['dist/']
    });

    expect(artifact.paths).toBeDefined();
    expect(artifact.paths).toEqual(['dist/']);
  });
});
