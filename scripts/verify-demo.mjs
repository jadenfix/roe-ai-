import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve('docs/demo');
const receipt = JSON.parse(await readFile(path.join(root, 'capture.json'), 'utf8'));

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

if (git('rev-parse', `${receipt.captured_source_commit}^{tree}`) !== receipt.captured_source_tree) {
  throw new Error('Captured source tree does not match the recorded commit');
}
for (const [file, expectedBlob] of Object.entries(receipt.runtime_input_blobs)) {
  const capturedBlob = git('rev-parse', `${receipt.captured_source_commit}:${file}`);
  const currentBlob = git('hash-object', file);
  if (capturedBlob !== expectedBlob || currentBlob !== expectedBlob) {
    throw new Error(`Runtime input drift: ${file}`);
  }
}
for (const [name, expected] of Object.entries(receipt.media)) {
  const file = path.join(root, name);
  const bytes = await readFile(file);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (bytes.length !== expected.bytes || sha256 !== expected.sha256) {
    throw new Error(`Media bytes do not match receipt: ${name}`);
  }
  const actual = probe(file);
  for (const key of ['codec_name', 'width', 'height', 'nb_read_frames']) {
    if (String(actual[key]) !== String(expected[key])) {
      throw new Error(`Media probe mismatch for ${name}: ${key}`);
    }
  }
}
console.log(`Verified ${Object.keys(receipt.media).length} media files against source ${receipt.captured_source_commit}`);
