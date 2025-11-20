import { describe, it, expect } from 'vitest';
import { Default } from '../Default.js';

describe('Default', () => {
  it('should create a default with basic configuration', () => {
    const defaultConfig = new Default({
      image: 'node:20'
    });

    expect(defaultConfig.props).toEqual({
      image: 'node:20'
    });
  });

  it('should create a default with before_script', () => {
    const defaultConfig = new Default({
      before_script: ['npm install']
    });

    expect(defaultConfig.props.before_script).toEqual(['npm install']);
  });

  it('should create a default with after_script', () => {
    const defaultConfig = new Default({
      after_script: ['npm run cleanup']
    });

    expect(defaultConfig.props.after_script).toEqual(['npm run cleanup']);
  });

  it('should create a default with tags', () => {
    const defaultConfig = new Default({
      tags: ['docker', 'linux']
    });

    expect(defaultConfig.props.tags).toEqual(['docker', 'linux']);
  });

  it('should create a default with retry configuration', () => {
    const defaultConfig = new Default({
      retry: 2
    });

    expect(defaultConfig.props.retry).toBe(2);
  });

  it('should create a default with retry as object', () => {
    const defaultConfig = new Default({
      retry: {
        max: 2,
        when: ['script_failure']
      }
    });

    expect(defaultConfig.props.retry).toEqual({
      max: 2,
      when: ['script_failure']
    });
  });

  it('should create a default with timeout', () => {
    const defaultConfig = new Default({
      timeout: '1h'
    });

    expect(defaultConfig.props.timeout).toBe('1h');
  });

  it('should create a default with interruptible', () => {
    const defaultConfig = new Default({
      interruptible: true
    });

    expect(defaultConfig.props.interruptible).toBe(true);
  });

  it('should create a default with multiple properties', () => {
    const defaultConfig = new Default({
      image: 'node:20',
      before_script: ['npm install'],
      after_script: ['npm run cleanup'],
      tags: ['docker'],
      retry: 2
    });

    expect(defaultConfig.props).toEqual({
      image: 'node:20',
      before_script: ['npm install'],
      after_script: ['npm run cleanup'],
      tags: ['docker'],
      retry: 2
    });
  });

  it('should store props as readonly', () => {
    const defaultConfig = new Default({
      image: 'node:20'
    });

    expect(defaultConfig.props).toBeDefined();
    expect(defaultConfig.props.image).toBe('node:20');
  });
});
