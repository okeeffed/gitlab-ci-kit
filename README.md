# GitLab CI Kit

An AWS CDK-style library for generating GitLab CI pipelines in TypeScript with type safety and composable constructs.

## Overview

GitLab CI Kit provides a programmatic way to define GitLab CI/CD pipelines using TypeScript instead of manually writing YAML. It uses an AWS CDK-inspired architecture with constructs, allowing you to build, compose, and reuse pipeline components in a type-safe manner.

The library automatically generates TypeScript types from GitLab's official JSON schema, ensuring your pipelines are always compatible with the latest GitLab CI features.

## Features

- 🎯 **Type-Safe Pipeline Definitions** - Full TypeScript support with auto-generated types from GitLab's official schema
- 🧩 **Composable Constructs** - Build pipelines using reusable components (Pipeline, Stage, Job)
- 🔄 **Auto-Generated Types** - Types are generated directly from GitLab's CI JSON schema
- ✅ **Built-in Validation** - Catch configuration errors before committing
- 📦 **CDK-Style Architecture** - Familiar pattern for developers who use AWS CDK or other infrastructure-as-code tools
- 🎨 **Clean YAML Output** - Synthesizes to readable GitLab CI YAML

## Installation

```bash
npm install gitlab-ci-kit
```

## Quick Start

```typescript
import { Pipeline, Stage, Job } from 'gitlab-ci-kit';

// Create a pipeline
const pipeline = new Pipeline(null, 'my-pipeline', {
  variables: {
    NODE_VERSION: '20',
  },
  workflow: {
    rules: [
      { if: '$CI_PIPELINE_SOURCE == "merge_request_event"' },
      { if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH' },
    ],
  },
});

// Create stages
const buildStage = new Stage(pipeline, 'build-stage', 'build');
const testStage = new Stage(pipeline, 'test-stage', 'test');

pipeline.addStage(buildStage);
pipeline.addStage(testStage);

// Add jobs
new Job(buildStage, 'build', {
  image: 'node:20',
  script: ['npm ci', 'npm run build'],
  artifacts: {
    paths: ['dist/'],
    expire_in: '1 week',
  },
});

new Job(testStage, 'test:unit', {
  image: 'node:20',
  script: ['npm ci', 'npm test'],
});

// Generate YAML
const yaml = pipeline.synth();
console.log(yaml);
```

## Core Concepts

### Pipeline

The top-level construct representing your entire GitLab CI configuration. Pipelines contain stages and global configuration.

### Stage

A logical grouping of jobs that run in a specific order. Jobs in the same stage run in parallel.

### Job

Individual tasks that execute scripts, build artifacts, run tests, or deploy applications.

### Synthesizer

Converts your TypeScript construct tree into valid GitLab CI YAML.

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
npm run typecheck

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
