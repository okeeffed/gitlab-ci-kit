import { describe, it, expect } from 'vitest';
import { Default } from '../Default.js';

describe('Default', () => {
  it('should create a default with basic configuration', () => {
    const defaultConfig = new Default({
      image: 'node:20'
    });

    expect(defaultConfig).toEqual({
      image: 'node:20'
    });
  });

  it('should create a default with before_script', () => {
    const defaultConfig = new Default({
      before_script: ['npm install']
    });

    expect(defaultConfig.before_script).toEqual(['npm install']);
  });

  it('should create a default with after_script', () => {
    const defaultConfig = new Default({
      after_script: ['npm run cleanup']
    });

    expect(defaultConfig.after_script).toEqual(['npm run cleanup']);
  });

  it('should create a default with tags', () => {
    const defaultConfig = new Default({
      tags: ['docker', 'linux']
    });

    expect(defaultConfig.tags).toEqual(['docker', 'linux']);
  });

  it('should create a default with retry configuration', () => {
    const defaultConfig = new Default({
      retry: 2
    });

    expect(defaultConfig.retry).toBe(2);
  });

  it('should create a default with retry as object', () => {
    const defaultConfig = new Default({
      retry: {
        max: 2,
        when: ['script_failure']
      }
    });

    expect(defaultConfig.retry).toEqual({
      max: 2,
      when: ['script_failure']
    });
  });

  it('should create a default with timeout', () => {
    const defaultConfig = new Default({
      timeout: '1h'
    });

    expect(defaultConfig.timeout).toBe('1h');
  });

  it('should create a default with interruptible', () => {
    const defaultConfig = new Default({
      interruptible: true
    });

    expect(defaultConfig.interruptible).toBe(true);
  });

  it('should create a default with multiple properties', () => {
    const defaultConfig = new Default({
      image: 'node:20',
      before_script: ['npm install'],
      after_script: ['npm run cleanup'],
      tags: ['docker'],
      retry: 2
    });

    expect(defaultConfig).toEqual({
      image: 'node:20',
      before_script: ['npm install'],
      after_script: ['npm run cleanup'],
      tags: ['docker'],
      retry: 2
    });
  });

  it('should store as readonly', () => {
    const defaultConfig = new Default({
      image: 'node:20'
    });

    expect(defaultConfig).toBeDefined();
    expect(defaultConfig.image).toBe('node:20');
  });
});
