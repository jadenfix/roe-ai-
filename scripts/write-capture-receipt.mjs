import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const sourceDir = path.resolve(process.argv[2] || 'artifacts/demo');
const outputDir = path.resolve('docs/demo');
const sourceCommit = process.env.CAPTURE_SOURCE_COMMIT || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const sourceTree = execFileSync('git', ['rev-parse', `${sourceCommit}^{tree}`], { encoding: 'utf8' }).trim();
const runtimeInputs = [
  'index.html',
  'package-lock.json',
  'package.json',
  'public/architecture.svg',
  'public/matrix.svg',
  'public/roe_ai_logo.jpeg',
  'src/App.jsx',
  'src/index.css',
  'src/main.jsx',
  'vite.config.js',
];
const media = [
  ['roe-ai-demo.gif', 'image/gif'],
  ['roe-ai-demo.mp4', 'video/mp4'],
  ['roe-ai-demo-poster.png', 'image/png'],
];

await mkdir(outputDir, { recursive: true });

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function probe(file) {
  return JSON.parse(execFileSync('ffprobe', [
    '-v', 'error', '-count_frames', '-select_streams', 'v:0',
    '-show_entries', 'stream=codec_name,width,height,nb_read_frames,duration',
    '-of', 'json', file,
  ], { encoding: 'utf8' })).streams[0];
}

const mediaReceipt = {};
for (const [name, mimeType] of media) {
  const source = path.join(sourceDir, name);
  const destination = path.join(outputDir, name);
  await copyFile(source, destination);
  const bytes = await readFile(destination);
  mediaReceipt[name] = {
    mime_type: mimeType,
    bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    ...probe(destination),
  };
}

const inputBlobs = Object.fromEntries(runtimeInputs.map((file) => [file, git('rev-parse', `${sourceCommit}:${file}`)]));
const runId = process.env.CAPTURE_WORKFLOW_RUN || null;
const repository = process.env.GITHUB_REPOSITORY || 'jadenfix/roe-ai-';
const server = process.env.GITHUB_SERVER_URL || 'https://github.com';
const receipt = {
  schema_version: 1,
  scope: 'Provider-free React presentation using synthetic examples; no Roe AI production system, customer data, live provider, measured performance, or deployment claim.',
  captured_source_commit: sourceCommit,
  captured_source_tree: sourceTree,
  workflow_run_id: runId,
  workflow_run_url: runId ? `${server}/${repository}/actions/runs/${runId}` : null,
  capture_command: 'npm run media:build',
  verification_command: 'npm run verify:demo',
  runtime_input_blobs: inputBlobs,
  media: mediaReceipt,
};
await writeFile(path.join(outputDir, 'capture.json'), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(`Wrote source-pinned receipt for ${sourceCommit} (${sourceTree})`);
