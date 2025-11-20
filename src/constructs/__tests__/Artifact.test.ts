import { describe, it, expect } from 'vitest';
import { Artifact } from '../Artifact.js';

describe('Artifact', () => {
  it('should create an artifact with basic configuration', () => {
    const artifact = new Artifact({
      paths: ['dist/', 'build/']
    });

    expect(artifact.props).toEqual({
      paths: ['dist/', 'build/']
    });
  });

  it('should create an artifact with name and paths', () => {
    const artifact = new Artifact({
      name: 'my-artifacts',
      paths: ['coverage/']
    });

    expect(artifact.props.name).toBe('my-artifacts');
    expect(artifact.props.paths).toEqual(['coverage/']);
  });

  it('should create an artifact with expire_in', () => {
    const artifact = new Artifact({
      paths: ['dist/'],
      expire_in: '1 week'
    });

    expect(artifact.props.expire_in).toBe('1 week');
  });

  it('should create an artifact with exclude patterns', () => {
    const artifact = new Artifact({
      paths: ['dist/'],
      exclude: ['*.log', 'tmp/']
    });

    expect(artifact.props.exclude).toEqual(['*.log', 'tmp/']);
  });

  it('should create an artifact with expose_as', () => {
    const artifact = new Artifact({
      paths: ['dist/'],
      expose_as: 'Build artifacts'
    });

    expect(artifact.props.expose_as).toBe('Build artifacts');
  });

  it('should create an artifact with when condition', () => {
    const artifact = new Artifact({
      paths: ['logs/'],
      when: 'on_failure'
    });

    expect(artifact.props.when).toBe('on_failure');
  });

  it('should create an artifact with untracked files', () => {
    const artifact = new Artifact({
      paths: ['dist/'],
      untracked: true
    });

    expect(artifact.props.untracked).toBe(true);
  });

  it('should create an artifact with public setting', () => {
    const artifact = new Artifact({
      paths: ['public/'],
      public: false
    });

    expect(artifact.props.public).toBe(false);
  });

  it('should store props as readonly', () => {
    const artifact = new Artifact({
      paths: ['dist/']
    });

    expect(artifact.props).toBeDefined();
    expect(artifact.props.paths).toEqual(['dist/']);
  });
});
