import { describe, it, expect } from 'vitest';
import { Rule } from '../Rule.js';

describe('Rule', () => {
  it('should create a rule with if condition', () => {
    const rule = new Rule({
      if: '$CI_COMMIT_BRANCH == "main"'
    });

    expect(rule.if).toBe('$CI_COMMIT_BRANCH == "main"');
  });

  it('should create a rule with changes', () => {
    const rule = new Rule({
      changes: ['src/**/*']
    });

    expect(rule.changes).toEqual(['src/**/*']);
  });

  it('should create a rule with exists', () => {
    const rule = new Rule({
      exists: ['Dockerfile']
    });

    expect(rule.exists).toEqual(['Dockerfile']);
  });

  it('should create a rule with variables', () => {
    const rule = new Rule({
      if: '$CI_COMMIT_BRANCH == "main"',
      variables: {
        DEPLOY_ENV: 'production'
      }
    });

    expect(rule.variables).toEqual({
      DEPLOY_ENV: 'production'
    });
  });

  it('should create a rule with when condition', () => {
    const rule = new Rule({
      if: '$CI_COMMIT_BRANCH == "main"',
      when: 'manual'
    });

    expect(rule.when).toBe('manual');
  });

  it('should create a rule with start_in', () => {
    const rule = new Rule({
      when: 'delayed',
      start_in: '5 minutes'
    });

    expect(rule.start_in).toBe('5 minutes');
  });

  it('should create a rule with allow_failure', () => {
    const rule = new Rule({
      if: '$CI_COMMIT_BRANCH == "develop"',
      allow_failure: true
    });

    expect(rule.allow_failure).toBe(true);
  });

  it('should create a rule with needs', () => {
    const rule = new Rule({
      if: '$CI_COMMIT_BRANCH == "main"',
      needs: ['build']
    });

    expect(rule.needs).toEqual(['build']);
  });

  it('should create a rule with interruptible', () => {
    const rule = new Rule({
      if: '$CI_COMMIT_BRANCH == "main"',
      interruptible: true
    });

    expect(rule.interruptible).toBe(true);
  });

  it('should create a rule with multiple conditions', () => {
    const rule = new Rule({
      if: '$CI_COMMIT_BRANCH == "main"',
      changes: ['src/**/*'],
      when: 'manual',
      variables: {
        DEPLOY: 'true'
      }
    });

    expect(rule.if).toBe('$CI_COMMIT_BRANCH == "main"');
    expect(rule.changes).toEqual(['src/**/*']);
    expect(rule.when).toBe('manual');
    expect(rule.variables).toEqual({
      DEPLOY: 'true'
    });
  });

  it('should create empty rule', () => {
    const rule = new Rule({});

    expect(rule).toEqual({});
  });
});
