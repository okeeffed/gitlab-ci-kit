import { Job, Rule, Default, synth } from '../src/index.ts';

// Define jobs with camelCase props
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
      expire_in: '1 week',  // camelCase!
    },
  }),

  test: new Job({
    stage: 'test',
    image: 'node:20',
    script: ['npm test'],
    before_script: ['npm ci'],  // camelCase!
    allow_failure: true,        // camelCase!
  }),

  deploy: new Job({
    stage: 'deploy',
    image: 'node:20',
    script: ['npm run deploy'],
    rules: [
      new Rule({ if: '$CI_COMMIT_BRANCH == "main"' }),
      new Rule({ if: '$CI_PIPELINE_SOURCE == "merge_request_event"', when: 'manual' }),
    ],
    environment: {
      name: 'production',
      url: 'https://example.com',
    },
  }),
};

// Pipeline config with camelCase
const config = {
  variables: {
    NODE_VERSION: '20',
  },
  stages: ['build', 'test', 'deploy'],
  default: new Default({
    id_tokens: {  // camelCase!
      GITLAB_OIDC_TOKEN: {
        aud: 'https://gitlab.com',
      },
    },
    tags: ['docker'],
  }),
};

// Generate YAML (converts to snake_case automatically)
const yaml = synth(jobs, config);
console.log(yaml);

