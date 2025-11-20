# GitLab CI Kit

A TypeScript library for generating GitLab CI pipelines with type safety and auto-generated schema types.

## Overview

GitLab CI Kit provides a programmatic way to define GitLab CI/CD pipelines using TypeScript instead of manually writing YAML. The library automatically generates TypeScript types from GitLab's official JSON schema, ensuring your pipelines are always compatible with the latest GitLab CI features.

Define your jobs and pipeline configuration in TypeScript, then synthesize them to valid GitLab CI YAML with automatic snake_case conversion.

## Features

- 🎯 **Type-Safe Pipeline Definitions** - Full TypeScript support with auto-generated types from GitLab's official schema
- 🔄 **Auto-Generated Types** - Types are generated directly from GitLab's CI JSON schema
- 🐍 **Automatic snake_case Conversion** - Write in camelCase, output in snake_case
- ✅ **Built-in Validation** - Catch configuration errors before committing
- 🎨 **Clean YAML Output** - Synthesizes to readable GitLab CI YAML
- 🧩 **Composable Jobs** - Build reusable job configurations with type safety

## Installation

```bash
npm install @okeeffed/gitlab-ci-kit
```

## Quick Start

```typescript
import { Job, Rule, Default, synth } from '@okeeffed/gitlab-ci-kit';

// Define jobs with camelCase properties
const jobs = {
  build: new Job({
    stage: 'build',
    image: 'node:20',
    script: ['npm ci', 'npm run build'],
    cache: {
      key: '${CI_COMMIT_REF_SLUG}',
      paths: ['node_modules/'],
    },
    artifacts: {
      paths: ['dist/'],
      expireIn: '1 week', // camelCase!
    },
  }),

  test: new Job({
    stage: 'test',
    image: 'node:20',
    script: ['npm test'],
    beforeScript: ['npm ci'], // camelCase!
    allowFailure: true, // camelCase!
  }),

  deploy: new Job({
    stage: 'deploy',
    image: 'node:20',
    script: ['npm run deploy'],
    rules: [
      new Rule({ if: '$CI_COMMIT_BRANCH == "main"' }),
      new Rule({
        if: '$CI_PIPELINE_SOURCE == "merge_request_event"',
        when: 'manual',
      }),
    ],
    environment: {
      name: 'production',
      url: 'https://example.com',
    },
  }),
};

// Pipeline configuration with camelCase
const config = {
  variables: {
    NODE_VERSION: '20',
  },
  stages: ['build', 'test', 'deploy'],
  default: new Default({
    idTokens: { // camelCase!
      GITLAB_OIDC_TOKEN: {
        aud: 'https://gitlab.com',
      },
    },
    tags: ['docker'],
  }),
};

// Generate YAML (automatically converts to snake_case)
const yaml = synth(jobs, config);
console.log(yaml);
```

## Core Concepts

### Job

Individual tasks that execute scripts, build artifacts, run tests, or deploy applications. Jobs are defined using the `Job` class with type-safe properties.

### Rule

Workflow rules that determine when jobs run. Create rules using the `Rule` class.

### Default

Global default settings applied to all jobs. Define using the `Default` class.

### synth()

The synthesizer function that converts your TypeScript job definitions and configuration into valid GitLab CI YAML, automatically converting camelCase properties to snake_case.

## Type Generation

The library includes a script that fetches the latest GitLab CI JSON schema and generates TypeScript types:

```bash
npm run generate:types
```

This ensures your pipeline definitions stay in sync with GitLab's latest features and validates your configuration against the official schema.

**Schema Source:** [GitLab CI JSON Schema](https://gitlab.com/gitlab-org/gitlab/-/raw/master/app/assets/javascripts/editor/schema/ci.json)

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Generate types from GitLab's schema
npm run generate:types

# Type checking
npm run type-check

# Lint
npm run lint

# Format code
npm run format
```

## Examples

See the [`examples/`](./examples) directory for complete pipeline examples.

## Requirements

- Node.js >= 18.0.0

## License

MIT
