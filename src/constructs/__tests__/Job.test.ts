import { describe, it, expect } from 'vitest';
import { Job } from '../Job.js';

describe('Job', () => {
  it('should create a job with basic script', () => {
    const job = new Job({
      script: ['npm test']
    });

    expect(job).toEqual({
      script: ['npm test']
    });
  });

  it('should create a job with image', () => {
    const job = new Job({
      image: 'node:20',
      script: ['npm test']
    });

    expect(job.image).toBe('node:20');
  });

  it('should create a job with stage', () => {
    const job = new Job({
      stage: 'test',
      script: ['npm test']
    });

    expect(job.stage).toBe('test');
  });

  it('should create a job with before_script', () => {
    const job = new Job({
      before_script: ['npm install'],
      script: ['npm test']
    });

    expect(job.before_script).toEqual(['npm install']);
  });

  it('should create a job with after_script', () => {
    const job = new Job({
      script: ['npm test'],
      after_script: ['npm run cleanup']
    });

    expect(job.after_script).toEqual(['npm run cleanup']);
  });

  it('should create a job with variables', () => {
    const job = new Job({
      script: ['npm test'],
      variables: {
        NODE_ENV: 'test',
        DEBUG: 'true'
      }
    });

    expect(job.variables).toEqual({
      NODE_ENV: 'test',
      DEBUG: 'true'
    });
  });

  it('should create a job with rules', () => {
    const job = new Job({
      script: ['npm test'],
      rules: [
        { if: '$CI_COMMIT_BRANCH == "main"' }
      ]
    });

    expect(job.rules).toEqual([
      { if: '$CI_COMMIT_BRANCH == "main"' }
    ]);
  });

  it('should create a job with only', () => {
    const job = new Job({
      script: ['npm test'],
      only: ['main', 'develop']
    });

    expect(job.only).toEqual(['main', 'develop']);
  });

  it('should create a job with except', () => {
    const job = new Job({
      script: ['npm test'],
      except: ['tags']
    });

    expect(job.except).toEqual(['tags']);
  });

  it('should create a job with tags', () => {
    const job = new Job({
      script: ['npm test'],
      tags: ['docker', 'linux']
    });

    expect(job.tags).toEqual(['docker', 'linux']);
  });

  it('should create a job with needs', () => {
    const job = new Job({
      script: ['npm test'],
      needs: ['build']
    });

    expect(job.needs).toEqual(['build']);
  });

  it('should create a job with dependencies', () => {
    const job = new Job({
      script: ['npm test'],
      dependencies: ['build']
    });

    expect(job.dependencies).toEqual(['build']);
  });

  it('should create a job with when condition', () => {
    const job = new Job({
      script: ['npm test'],
      when: 'manual'
    });

    expect(job.when).toBe('manual');
  });

  it('should create a job with allow_failure', () => {
    const job = new Job({
      script: ['npm test'],
      allow_failure: true
    });

    expect(job.allow_failure).toBe(true);
  });

  it('should create a job with timeout', () => {
    const job = new Job({
      script: ['npm test'],
      timeout: '30m'
    });

    expect(job.timeout).toBe('30m');
  });

  it('should create a job with retry', () => {
    const job = new Job({
      script: ['npm test'],
      retry: 2
    });

    expect(job.retry).toBe(2);
  });

  it('should create a job with parallel', () => {
    const job = new Job({
      script: ['npm test'],
      parallel: 3
    });

    expect(job.parallel).toBe(3);
  });

  it('should create a job with environment', () => {
    const job = new Job({
      script: ['npm run deploy'],
      environment: 'production'
    });

    expect(job.environment).toBe('production');
  });

  it('should create a job with coverage', () => {
    const job = new Job({
      script: ['npm test'],
      coverage: '/Coverage: \\d+\\.\\d+/'
    });

    expect(job.coverage).toBe('/Coverage: \\d+\\.\\d+/');
  });

  it('should assign properties directly to instance', () => {
    const job = new Job({
      script: ['npm test']
    });

    expect(job.script).toBeDefined();
    expect(job.script).toEqual(['npm test']);
  });
});
