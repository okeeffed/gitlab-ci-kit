import { Pipeline, Stage, Job } from '../src/index.js';

// Create a new pipeline
const pipeline = new Pipeline(null, 'my-pipeline', {
  variables: {
    NODE_VERSION: '20',
    CI_DEBUG: 'false',
  },
  workflow: {
    rules: [
      {
        if: '$CI_PIPELINE_SOURCE == "merge_request_event"',
      },
      {
        if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH',
      },
    ],
  },
});

// Create stages
const buildStage = new Stage(pipeline, 'build-stage', 'build');
const testStage = new Stage(pipeline, 'test-stage', 'test');
const deployStage = new Stage(pipeline, 'deploy-stage', 'deploy');

pipeline.addStage(buildStage);
pipeline.addStage(testStage);
pipeline.addStage(deployStage);

// Add jobs to build stage
new Job(buildStage, 'build', {
  image: 'node:20',
  script: ['npm ci', 'npm run build'],
  artifacts: {
    paths: ['dist/'],
    expire_in: '1 week',
  },
  cache: {
    key: '${CI_COMMIT_REF_SLUG}',
    paths: ['node_modules/'],
  },
});

// Add jobs to test stage
new Job(testStage, 'test:unit', {
  image: 'node:20',
  script: ['npm ci', 'npm run test:unit'],
  coverage: '/Lines\\s*:\\s*(\\d+\\.\\d+)%/',
  artifacts: {
    reports: {
      junit: 'junit.xml',
      coverage_report: {
        coverage_format: 'cobertura',
        path: 'coverage/cobertura-coverage.xml',
      },
    },
  },
});

new Job(testStage, 'test:lint', {
  image: 'node:20',
  script: ['npm ci', 'npm run lint'],
  allow_failure: true,
});

// Add jobs to deploy stage
new Job(deployStage, 'deploy:staging', {
  image: 'node:20',
  script: ['echo "Deploying to staging..."', 'npm run deploy:staging'],
  environment: {
    name: 'staging',
    url: 'https://staging.example.com',
  },
  rules: [
    {
      if: '$CI_COMMIT_BRANCH == "develop"',
    },
  ],
});

new Job(deployStage, 'deploy:production', {
  image: 'node:20',
  script: ['echo "Deploying to production..."', 'npm run deploy:production'],
  environment: {
    name: 'production',
    url: 'https://example.com',
    action: 'start',
  },
  when: 'manual',
  rules: [
    {
      if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH',
    },
  ],
});

// Synthesize to YAML
try {
  const yaml = pipeline.synth();
  console.log(yaml);
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
